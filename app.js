/**
 * بيتزا المهندس - App Logic
 * Cart, Menu, Custom Pizza Builder, WhatsApp Order
 */

// ====== Cursor Glow ======
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// ====== Mobile Nav Toggle ======
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('open');
        });
    });
}

// ====== Scroll Active Nav Link ======
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

function onScroll() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Header bg
    const header = document.getElementById('mainHeader');
    if (header) {
        if (window.scrollY > 60) {
            header.style.background = 'rgba(12, 10, 9, 0.95)';
        } else {
            header.style.background = 'rgba(12, 10, 9, 0.85)';
        }
    }
}
window.addEventListener('scroll', onScroll);

// ====== Scroll Reveal Animation ======
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.feature-card, .menu-card, .review-card, .story-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add revealed class styles
const revealStyle = document.createElement('style');
revealStyle.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(revealStyle);

initScrollReveal();

// ====== Menu Data ======
const menuItems = [
    {
        id: 'meat-lovers',
        name: 'بيتزا اللحوم المشكلة',
        category: 'special',
        desc: 'لعشاق اللحوم! قطع لحم بقري مشوية، سلامي مدخن، بيبروني، مع مشروم طازج وفلفل ألوان وجبنة موزاريلا غنية.',
        price: 145,
        tag: 'الأكثر طلباً',
        tagClass: 'tag-popular',
        img: 'assets/pizza-senior.png'
    },
    {
        id: 'margherita',
        name: 'بيتزا مارغريتا',
        category: 'classic',
        desc: 'البيتزا الكلاسيكية الأصلية. صلصة طماطم طبيعية مع جبنة موزاريلا إيطالية فاخرة وريحان طازج وزيت زيتون بكر.',
        price: 85,
        tag: 'كلاسيك',
        tagClass: 'tag-new',
        img: 'assets/pizza-junior.png'
    },
    {
        id: 'chicken-ranch',
        name: 'بيتزا فراخ رانش',
        category: 'special',
        desc: 'صدور فراخ مشوية بتتبيلة خاصة مع صوص رانش كريمي دسم، زيتون أسود وفلفل هالبينو حار لمحبي المغامرة.',
        price: 135,
        tag: '🔥 حار',
        tagClass: 'tag-hot',
        img: 'assets/pizza-system.png'
    },
    {
        id: 'pepperoni',
        name: 'بيتزا بيبروني',
        category: 'classic',
        desc: 'بيبروني بقري فاخر بكمية سخية فوق صلصة طماطم إيطالية وجبنة موزاريلا سايحة ومحمرة. بسيطة ولذيذة.',
        price: 110,
        tag: 'الأكثر طلباً',
        tagClass: 'tag-popular',
        img: 'assets/pizza-database.png'
    },
    {
        id: 'four-cheese',
        name: 'بيتزا الأربع أجبان',
        category: 'classic',
        desc: 'مزيج رائع من أربع أنواع جبنة: موزاريلا، شيدر، بارميزان، وجبنة زرقاء مع زيت ثوم وزعتر. غنية بالطعم.',
        price: 120,
        tag: 'جديدة',
        tagClass: 'tag-new',
        img: 'assets/pizza-server.png'
    },
    {
        id: 'supreme',
        name: 'بيتزا سوبريم',
        category: 'special',
        desc: 'كل حاجة لذيذة في بيتزا واحدة! فراخ، بيبروني، مشروم، زيتون، فلفل ألوان، بصل، مع صوص رانش وباربكيو.',
        price: 155,
        tag: '🔥 مميزة',
        tagClass: 'tag-hot',
        img: 'assets/pizza-spaghetti.png'
    },
    {
        id: 'nutella-cookie',
        name: 'كوكيز نوتيلا',
        category: 'sweet',
        desc: 'كوكيز ضخمة مخبوزة طازة في الفرن بقطع شوكولاتة داكنة ومحشية بنوتيلا سخنة سايحة. حلاوة مالهاش حل!',
        price: 45,
        tag: 'الأكثر طلباً',
        tagClass: 'tag-popular',
        img: 'assets/sweet-push.png'
    },
    {
        id: 'caramel-brownie',
        name: 'براونيز كراميل',
        category: 'sweet',
        desc: 'قطعة براونيز شوكولاتة غنية ودافئة مغطاة بصوص كراميل مملح وقطع بندق مقرمشة. النهاية المثالية لأي وجبة.',
        price: 40,
        tag: 'جديدة',
        tagClass: 'tag-new',
        img: 'assets/sweet-pull.png'
    }
];

// ====== Render Menu ======
const menuGrid = document.getElementById('menuGrid');
function renderMenu(items) {
    if (!menuGrid) return;
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-card" data-category="${item.category}">
            <div class="card-img-wrap">
                <img src="${item.img}" alt="${item.name}" class="menu-card-img" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60'">
                <span class="card-tag ${item.tagClass}">${item.tag}</span>
            </div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p class="desc">${item.desc}</p>
                <div class="card-bottom">
                    <span class="price">${item.price} ج.م</span>
                    <button class="add-btn" onclick="addToCart('${item.id}')" aria-label="أضف للسلة">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Re-apply scroll reveal to newly rendered cards
    initScrollReveal();
}

renderMenu(menuItems);

// ====== Menu Tab Filters ======
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        renderMenu(cat === 'all' ? menuItems : menuItems.filter(i => i.category === cat));
    });
});

// ====== Cart System ======
let cart = JSON.parse(localStorage.getItem('pizza_cart')) || [];

const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const shippingForm = document.getElementById('shippingForm');
const cartFooter = document.getElementById('cartFooter');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const sendOrderBtn = document.getElementById('sendOrderBtn');

function saveCart() {
    localStorage.setItem('pizza_cart', JSON.stringify(cart));
    updateBadge();
    renderCart();
}

function updateBadge() {
    if (!cartCount) return;
    const total = cart.reduce((s, i) => s + i.qty, 0);
    cartCount.textContent = total;
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 300);
}

function openCart() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('open');
}

function closeCartDrawer() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');
}

cartToggleBtn?.addEventListener('click', openCart);
closeCartBtn?.addEventListener('click', closeCartDrawer);
cartOverlay?.addEventListener('click', closeCartDrawer);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-cart-link')) closeCartDrawer();
});

window.addToCart = function (id) {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    }
    saveCart();
    openCart();

    // Toast feedback
    showToast(`✅ تم إضافة "${item.name}" للسلة`);
};

window.changeQty = function (idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart();
};

window.removeItem = function (idx) {
    cart.splice(idx, 1);
    saveCart();
};

function renderCart() {
    if (!cartItems) return;
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <p>السلة فاضية!</p>
                <a href="#menu" class="btn btn-secondary btn-sm close-cart-link">تصفح المنيو</a>
            </div>`;
        if (shippingForm) shippingForm.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, idx) => `
            <div class="cart-item">
                <div class="details">
                    <h4>${item.name}</h4>
                    <p class="meta">سعر القطعة: ${item.price} ج.م</p>
                    <div class="qty-row">
                        <button class="qty-btn" onclick="changeQty(${idx}, -1)">-</button>
                        <span class="qty-num">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
                    </div>
                </div>
                <div class="item-total">${item.price * item.qty} ج.م</div>
                <button class="remove-btn" onclick="removeItem(${idx})" aria-label="حذف">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
        `).join('');
        if (shippingForm) shippingForm.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'block';
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        if (cartTotalPrice) cartTotalPrice.textContent = total + ' ج.م';
    }
}

updateBadge();
renderCart();

// ====== Toast System ======
function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(20, 16, 14, 0.95);
        border: 1px solid rgba(255, 107, 44, 0.3);
        color: #fafaf9;
        padding: 14px 28px;
        border-radius: 14px;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 999;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ====== Custom Pizza Builder ======
const crustRadios = document.querySelectorAll('input[name="crust"]');
const sauceRadios = document.querySelectorAll('input[name="sauce"]');
const cheeseRadios = document.querySelectorAll('input[name="cheese"]');
const toppingCBs = document.querySelectorAll('input[name="topping"]');
const builderTotalPrice = document.getElementById('builderTotalPrice');
const addCustomBtn = document.getElementById('addCustomPizzaBtn');

const visualSauce = document.getElementById('visualSauce');
const visualCheese = document.getElementById('visualCheese');
const visualToppings = document.getElementById('visualToppings');

const basePrices = { thin: 70, thick: 85, stuffed: 100 };

const toppingPositions = [
    { top: '28%', left: '32%' }, { top: '30%', left: '58%' }, { top: '52%', left: '26%' },
    { top: '48%', left: '62%' }, { top: '18%', left: '44%' }, { top: '68%', left: '44%' },
    { top: '40%', left: '16%' }, { top: '36%', left: '74%' }, { top: '62%', left: '68%' },
    { top: '44%', left: '44%' }, { top: '20%', left: '28%' }, { top: '72%', left: '32%' },
    { top: '24%', left: '68%' }, { top: '66%', left: '58%' }
];

function updateBuilderVisuals() {
    // Sauce
    const sauce = document.querySelector('input[name="sauce"]:checked').value;
    if (visualSauce) {
        visualSauce.className = 'sauce-layer ' + sauce;
    }

    // Cheese
    const cheese = document.querySelector('input[name="cheese"]:checked').value;
    if (visualCheese) {
        visualCheese.className = 'cheese-layer';
        if (cheese === 'double') visualCheese.classList.add('double-cheese');
    }

    // Toppings
    if (visualToppings) {
        visualToppings.innerHTML = '';
        const checked = Array.from(toppingCBs).filter(cb => cb.checked);
        checked.forEach((cb, ti) => {
            const val = cb.value;
            for (let i = 0; i < 4; i++) {
                const pos = toppingPositions[(ti * 4 + i) % toppingPositions.length];
                const el = document.createElement('div');
                el.className = `visual-topping ${val}`;
                const rTop = (Math.random() * 6 - 3);
                const rLeft = (Math.random() * 6 - 3);
                el.style.top = `calc(${pos.top} + ${rTop}px)`;
                el.style.left = `calc(${pos.left} + ${rLeft}px)`;
                el.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
                visualToppings.appendChild(el);
            }
        });
    }
}

function calcBuilderPrice() {
    if (!builderTotalPrice) return;
    const crust = document.querySelector('input[name="crust"]:checked').value;
    let total = basePrices[crust] || 70;
    total += parseFloat(document.querySelector('input[name="sauce"]:checked').dataset.price || 0);
    total += parseFloat(document.querySelector('input[name="cheese"]:checked').dataset.price || 0);
    toppingCBs.forEach(cb => {
        if (cb.checked) total += parseFloat(cb.dataset.price || 0);
    });
    builderTotalPrice.textContent = total;
}

function setupRadioListeners(radios) {
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const name = radio.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.closest('.option-card').classList.remove('active');
            });
            radio.closest('.option-card').classList.add('active');
            calcBuilderPrice();
            updateBuilderVisuals();
        });
    });
}

setupRadioListeners(crustRadios);
setupRadioListeners(sauceRadios);
setupRadioListeners(cheeseRadios);

toppingCBs.forEach(cb => {
    cb.addEventListener('change', () => {
        cb.closest('.topping-chip').classList.toggle('checked', cb.checked);
        calcBuilderPrice();
        updateBuilderVisuals();
    });
});

// Add custom pizza to cart
if (addCustomBtn) {
    addCustomBtn.addEventListener('click', () => {
        const crustLabel = document.querySelector('input[name="crust"]:checked').closest('.option-card').querySelector('h4').textContent;
        const sauceLabel = document.querySelector('input[name="sauce"]:checked').closest('.option-card').querySelector('h4').textContent;
        const toppings = Array.from(toppingCBs).filter(cb => cb.checked).map(cb => cb.dataset.label);
        const price = parseFloat(builderTotalPrice.textContent);

        let name = `بيتزا خاصة (${crustLabel}`;
        if (toppings.length > 0) {
            name += ` + ${toppings.join(' + ')}`;
        }
        name += ')';

        cart.push({
            id: 'custom-' + Date.now(),
            name,
            price,
            qty: 1
        });

        saveCart();
        openCart();
        showToast('✅ تم إضافة البيتزا الخاصة للسلة');
    });
}

// Initial visual
updateBuilderVisuals();
calcBuilderPrice();

// ====== WhatsApp Order ======
if (sendOrderBtn) {
    sendOrderBtn.addEventListener('click', () => {
        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const address = document.getElementById('custAddress').value.trim();
        const notes = document.getElementById('custNotes').value.trim();
        const form = document.getElementById('orderForm');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        let msg = `🍕 *طلب جديد من بيتزا المهندس*\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `👤 *الاسم:* ${name}\n`;
        msg += `📞 *الموبايل:* ${phone}\n`;
        msg += `📍 *العنوان:* ${address}\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
        msg += `📦 *الطلب:*\n`;

        cart.forEach(item => {
            msg += `• ${item.qty}x ${item.name} — ${item.price * item.qty} ج.م\n`;
        });

        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        msg += `\n━━━━━━━━━━━━━━━━━━━━\n`;
        if (notes) msg += `💬 *ملاحظات:* ${notes}\n━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `💰 *الإجمالي:* *${total} ج.م*\n`;

        const waNum = '201012345678';
        const url = `https://api.whatsapp.com/send?phone=${waNum}&text=${encodeURIComponent(msg)}`;

        cart = [];
        saveCart();
        closeCartDrawer();
        window.open(url, '_blank');
    });
}
