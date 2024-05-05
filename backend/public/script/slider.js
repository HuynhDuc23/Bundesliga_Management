document.addEventListener('DOMContentLoaded', function(){

    const slides = document.querySelectorAll('.slides__img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    // Hàm chuyển đến slide trước đó
    function prevSlide() {
        const newIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        changeSlide(newIndex);
    }
    
    // Hàm chuyển đến slide kế tiếp
    function nextSlide() {
        const newIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        changeSlide(newIndex);
    }
    
    // Hàm thay đổi slide hiện tại
    function changeSlide(newIndex) {
        slides[currentIndex].classList.remove('active');
        slides[newIndex].classList.add('active');
        currentIndex = newIndex;
    }
    
    // Sự kiện khi nhấn nút "Back"
    prevBtn.addEventListener('click', prevSlide);
    
    // Sự kiện khi nhấn nút "Next"
    nextBtn.addEventListener('click', nextSlide);
    
    // Tự động chuyển slide
    setInterval(nextSlide, 2000);
})