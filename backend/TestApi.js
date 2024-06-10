
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
(async () => {
  try {
    // Mở trình duyệt Chrome
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Đăng nhập và lấy token từ biến môi trường trong Postman
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjY4ZTk5YjU3OTMzOWFjMzY5YmYzZiIsImFkbWluIjoiQURNSU4iLCJpYXQiOjE3MTgwMDE3NDIsImV4cCI6MTcxODAwNTM0Mn0.CGX6J61w05QmEAPYeHpA1nbXesOoAibxN9FRd9ziQKU";

    // Thiết lập header Authorization để gửi token
    await page.setExtraHTTPHeaders({ 'Authorization': `Bearer ${token}` });

    // Điều hướng đến URL của giao diện cần kiểm tra
    await page.goto('http://localhost:8000/api/v1/season');

    // Thực hiện kiểm tra giao diện ở đây, ví dụ:
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);

    // Đóng trình duyệt
    // await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

