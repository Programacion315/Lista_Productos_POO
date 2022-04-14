

class UI{ /*Metodos de la interfaz*/ 

    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');

        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Producto</strong> : ${product.nombre}
                    <strong>Precio</strong> : ${product.precio}
                    <strong>Año</strong> : ${product.anio}
                    <a href="#" class="btn btn-danger ml-2" name="delete">Borrar</a>
                </div>
            </div>
            ` 
        ;

        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset()
    }

    deleteProduct(element){
       
        if(element.name === 'delete'){

            element.parentElement.parentElement.parentElement.remove()
            this.showMessage("Eliminado con exito", 'danger');
        }   
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message))
        // Mostrar en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector("#app")
        container.insertBefore(div, app); //El div, antes de nuestra aplicacion
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

class Product{

    constructor(nombre, precio, anio){
        this.nombre = nombre;
        this.precio = precio;
        this.anio = anio;
    }
   
}

//DOM ELEMENTS
document.getElementById('product-form')
        .addEventListener('submit', function(e){

            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            const year = document.getElementById('year').value;
            
            const product = new Product(name, price, year)

            const ui = new UI();

            if(name === '' || price === '' || year === ''){
                ui.showMessage("Completa los campos", 'danger');
            }
            else{

            ui.addProduct(product);
            ui.resetForm();

            ui.showMessage('Producto agregado satisfactoriamente', 'success')
            }
            e.preventDefault(); 

})

document.getElementById('product-list').addEventListener('click', function(e){

    const ui = new UI();
    ui.deleteProduct(e.target); /*Pasamos el enlace que le ha dado click el usuario*/
});