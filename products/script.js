let kitchenProducts = [
	{
		type: 'grater',
		price: 10
	},
	{
		type: 'pastry-bag',
		price: 25
	},
	{
		type: 'scale',
		price: 5
	},
	{
		type: 'whisk',
		price: 15
	}
];

let devicesProducts = [
	{
		type: 'desktop',
		price: [100,1000]
	},
	{
		type: 'laptop',
		price: [50,1500]
	},
	{
		type: 'smartphone',
		price: [80,2000]
	},
	{
		type: 'tablet',
		price: [20,1300]
	}
];

let cosmeticsProducts = [
	{
		type: 'blush',
		price: 100
	},
	{
		type: 'eyeshadow',
		price: 50
	},
	{
		type: 'lipstick',
		price: 80
	},
	{
		type: 'nail-polish',
		price: 200
	},
	{
		type: 'perfume',
		price: 300,
	}
];

function Category(nameOfCategory, whatDiscount) {
	this.category = nameOfCategory;
	this.discount = whatDiscount;
	this.quality = `new`;

};


let Kitchen = new Category(`kitchen`, 10);
let Devices = new Category(`devices`, 20);
let Cosmetics = new Category(`cosmetics`, 30);

Category.prototype.render = function() {

	let thePrice = typeof this.price === `object` ? this.price.join(`-`) : this.price;

	function buildDiv(name, content) {
		let stringWithDiv = `<div class="element">${name}:<span class="bold"> ${content}</span> </div>`;
		return stringWithDiv;
	}
	let block = `<div class="product product-${this.category}">
		<img src="images/${this.category}/${this.type}.svg">
		${buildDiv(`Name`, this.type)}
		${buildDiv(`Price`, `$${thePrice}`)}
		${buildDiv(`Discount`, this.discount)}
		${buildDiv(`Quality`, this.quality)}
	</div>`
	return block;
};

function addPrototype(currentArr, proto) {
	let newArr = currentArr.map(addPrototype);

	function addPrototype(product) {
		let newProduct = Object.create(proto);

		for (key in product) {
			newProduct[key] = product[key];
		};
		return newProduct;
	};
	return newArr;
};

kitchenProductsWithProto = addPrototype(kitchenProducts, Kitchen);
devicesProductsWithProto = addPrototype(devicesProducts, Devices);
cosmeticsProductsWithProto = addPrototype(cosmeticsProducts, Cosmetics);

function renderProduct(arr){
	return arr.map(function(product){
		return product.render();
	})
};

function renderCategory(arr){
	let saveCaterories = `<div class="category category-${arr[0].category}">
				<h2>Category: ${arr[0].category}</h2>
				<div class = "products-wrapper">${renderProduct(arr).join('')}</div> 
				<div class="row"></div>
			</div>`;
			return saveCaterories;
}; 

document.write(`<div class="container"> ${renderCategory(kitchenProductsWithProto)} ${renderCategory(devicesProductsWithProto)} ${renderCategory(cosmeticsProductsWithProto)}</div>`)
