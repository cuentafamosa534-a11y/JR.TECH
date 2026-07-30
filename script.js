//==========================
// JR TECH - SCRIPT V2
// PARTE 1/3
//==========================

// Productos
const productsContainer = document.getElementById("products");

// Carrito
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("count");
const totalElement = document.getElementById("total");

// Modal
const checkoutBtn = document.getElementById("checkout");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
const sendOrder = document.getElementById("sendOrder");

// Formulario
const deliveryType = document.getElementById("deliveryType");
const direccionBox = document.getElementById("direccionBox");
const metroBox = document.getElementById("metroBox");

// Datos cliente
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerAddress = document.getElementById("customerAddress");
const customerCommune = document.getElementById("customerCommune");
const customerMetro = document.getElementById("customerMetro");
const customerNote = document.getElementById("customerNote");

// Buscador
const search = document.getElementById("search");

// Carrito
let carrito = [];

//==========================
// NOTIFICACIÓN
//==========================

function toast(texto){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `✅ ${texto}`;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>toast.remove(),300);

    },2500);

}

//==========================
// RENDER PRODUCTOS
//==========================

function renderProducts(lista = PRODUCTS){

    productsContainer.innerHTML = "";

    lista.forEach(producto=>{

        const card = document.createElement("div");

        card.className="card";

        card.innerHTML=`

        <img class="foto" src="${producto.image}">

        <div class="info">

            <small>${producto.category}</small>

            <h3>${producto.name}</h3>

            <h2>$${producto.price.toLocaleString("es-CL")}</h2>

            <button onclick="agregar(${producto.id})">

                🛒 Agregar al carrito

            </button>

        </div>

        `;

        productsContainer.appendChild(card);

    });

}

//==========================
// AGREGAR
//==========================

function agregar(id){

    const existe = carrito.find(p=>p.id===id);

    if(existe){

        existe.qty++;

    }else{

        const producto = PRODUCTS.find(p=>p.id===id);

        carrito.push({...producto,qty:1});

    }

    renderCart();

    toast("Producto agregado al carrito");

}

//==========================
// CANTIDAD
//==========================

function sumar(id){

    carrito.find(p=>p.id===id).qty++;

    renderCart();

}

function restar(id){

    const p = carrito.find(x=>x.id===id);

    p.qty--;

    if(p.qty<=0){

        eliminar(id);

        return;

    }

    renderCart();

}

//==========================
// ELIMINAR
//==========================

function eliminar(id){

    carrito = carrito.filter(p=>p.id!==id);

    renderCart();

}

//==========================
// RENDER CARRITO
//==========================

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let cantidad = 0;

    if (carrito.length === 0) {

        cartItems.innerHTML = `
            <div style="text-align:center;padding:40px;color:#aaa;">
                <h2>🛒</h2>
                <p>Tu carrito está vacío.</p>
            </div>
        `;

    }

    carrito.forEach(item => {

        total += item.price * item.qty;
        cantidad += item.qty;

        const div = document.createElement("div");

        div.className = "item-cart";

        div.innerHTML = `

            <h4>${item.name}</h4>

            <p><strong>$${item.price.toLocaleString("es-CL")}</strong></p>

            <div style="display:flex;align-items:center;gap:10px;margin:15px 0;">

                <button onclick="restar(${item.id})">−</button>

                <span>${item.qty}</span>

                <button onclick="sumar(${item.id})">+</button>

            </div>

            <button onclick="eliminar(${item.id})">
                🗑 Eliminar
            </button>

        `;

        cartItems.appendChild(div);

    });

    cartCount.textContent = cantidad;

    totalElement.textContent = total.toLocaleString("es-CL");

}


//==========================
// EVENTOS
// PARTE 2/3
//==========================

// Abrir carrito
cartBtn.addEventListener("click",()=>{

    cartPanel.classList.remove("hidden");

});

// Cerrar carrito
closeCart.addEventListener("click",()=>{

    cartPanel.classList.add("hidden");

});

// Cerrar modal
closeModal.addEventListener("click",()=>{

    checkoutModal.classList.add("hidden");

});

// Cerrar al hacer clic fuera
checkoutModal.addEventListener("click",(e)=>{

    if(e.target===checkoutModal){

        checkoutModal.classList.add("hidden");

    }

});

//==========================
// CHECKOUT
//==========================

checkoutBtn.addEventListener("click",()=>{

    if(carrito.length===0){

        toast("Tu carrito está vacío");

        return;

    }

    checkoutModal.classList.remove("hidden");

});

//==========================
// ENTREGA
//==========================

deliveryType.addEventListener("change",()=>{

    if(deliveryType.value==="domicilio"){

        direccionBox.style.display="block";

        metroBox.style.display="none";

    }else{

        direccionBox.style.display="none";

        metroBox.style.display="block";

    }

});

//==========================
// BUSCADOR
//==========================

search.addEventListener("input",(e)=>{

    const texto=e.target.value.toLowerCase();

    const filtrados=PRODUCTS.filter(producto=>

        producto.name.toLowerCase().includes(texto) ||

        producto.category.toLowerCase().includes(texto)

    );

    renderProducts(filtrados);

});

//==========================
// BOTÓN HERO
//==========================

document.getElementById("verProductos").addEventListener("click",()=>{

    document.getElementById("productos").scrollIntoView({

        behavior:"smooth"

    });

});

//==========================
// ESC
//==========================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        checkoutModal.classList.add("hidden");

        cartPanel.classList.add("hidden");

    }

});
//==========================
// PARTE 3/3
// CHECKOUT + WHATSAPP
//==========================

sendOrder.addEventListener("click",()=>{

    if(customerName.value.trim()===""){

        toast("Ingresa tu nombre");

        customerName.focus();

        return;

    }

    if(customerPhone.value.trim()===""){

        toast("Ingresa tu teléfono");

        customerPhone.focus();

        return;

    }

    let entrega="";

    if(deliveryType.value==="domicilio"){

        if(customerAddress.value.trim()===""){

            toast("Ingresa la dirección");

            customerAddress.focus();

            return;

        }

        if(customerCommune.value.trim()===""){

            toast("Ingresa la comuna");

            customerCommune.focus();

            return;

        }

        entrega=`

🚚 Envío a domicilio

📍 Dirección: ${customerAddress.value}

🏘️ Comuna: ${customerCommune.value}

`;

    }else{

        if(customerMetro.value.trim()===""){

            toast("Ingresa la estación de Metro");

            customerMetro.focus();

            return;

        }

        entrega=`

🚇 Entrega en Metro

🚉 Estación: ${customerMetro.value}

`;

    }

    let mensaje=`🛒 *NUEVO PEDIDO - JR TECH*

👤 Cliente:
${customerName.value}

📞 Teléfono:
${customerPhone.value}

━━━━━━━━━━━━━━

📦 PRODUCTOS

`;

    let totalPedido=0;

    carrito.forEach(item=>{

        mensaje+=`• ${item.name}
Cantidad: ${item.qty}
Subtotal: $${(item.price*item.qty).toLocaleString("es-CL")}

`;

        totalPedido+=item.price*item.qty;

    });

    mensaje+=`

━━━━━━━━━━━━━━

💰 TOTAL

$${totalPedido.toLocaleString("es-CL")}

${entrega}

📝 Observaciones

${customerNote.value || "Sin observaciones"}

`;

    const url="https://wa.me/56949935461?text="+encodeURIComponent(mensaje);

    window.open(url,"_blank");

    carrito=[];

    renderCart();

    checkoutModal.classList.add("hidden");

    customerName.value="";
    customerPhone.value="";
    customerAddress.value="";
    customerCommune.value="";
    customerMetro.value="";
    customerNote.value="";

    toast("Pedido enviado correctamente");

});

//==========================
// INICIO
//==========================

renderProducts();
renderCart();