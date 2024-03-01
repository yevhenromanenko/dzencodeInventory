const {Router} = require('express');
const excel = require('exceljs');

const router = Router();
const Product = require(".././models/Product");

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productsPost = require('./products/productsPost')
const productsGet = require('./products/productsGet')
const productsDelete = require('./products/productsDelete')

const ordersPost = require('./orders/ordersPost')
const ordersGet = require('./orders/ordersGet')
const ordersDelete = require('./orders/ordersDelete')

const registrationPost = require('./registration/registrationPost')
const loginPost = require('./login/loginPost')
const usersGet = require('./users/usersGet')

router.post('/products', productsPost);
router.get('/products', productsGet);
router.delete('/products', productsDelete)

router.post('/orders', ordersPost);
router.get('/orders', ordersGet);
router.delete('/orders', ordersDelete)

router.post('/registration', registrationPost)
router.post('/login', loginPost);

router.get('/users', usersGet)

router.post('/upload', upload.single('file'), async (req, res) => {
    try {

        const userId = req.body.userId;

        const xlsData = await parseXLS(req.file.buffer);

        if (!Array.isArray(xlsData)) {
            throw new Error("Invalid data format");
        }

        // Загрузка продуктов в базу данных
        const addedProducts = await Promise.all(xlsData.map(async (data) => {
            const newProduct = new Product({
                userId: userId,
                id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                serialNumber: data[1],
                isNew: data[2],
                status: data[3],
                name: data[4],
                photo: data[5],
                title: data[6],
                type: data[7],
                specification: data[8],
                guarantee: {
                    start: data[9],
                    end: data[10],
                },
                price: [
                    { value: parseFloat(data[11]), symbol: 'USD', isDefault: 0 },
                    { value: parseFloat(data[11]) * 38, symbol: 'UAH', isDefault: 1 },
                ],
                order: data[12],
                date: new Date().toISOString(),
            });

            await newProduct.save();
            return newProduct.toObject();
        }));

        res.status(200).json({ success: true, message: 'Products added successfully', products: addedProducts });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

async function parseXLS(buffer) {
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const rowData = [];
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rowData.push(cell.value);
        });
        data.push(rowData);
    });

    return data;
}

module.exports = router;
