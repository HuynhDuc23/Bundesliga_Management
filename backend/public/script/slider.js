
function autoSlide() {
    // Lấy tất cả các slide và nút prev, next
    const slides = document.querySelectorAll('.slides__img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    // Tìm slide hiện tại
    let currentIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });

    // Chuyển slide tiếp theo
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    // Hiển thị slide tiếp theo và ẩn slide hiện tại
    slides[currentIndex].classList.remove('active');
    slides[nextIndex].classList.add('active');
}
setInterval(autoSlide, 2000);
