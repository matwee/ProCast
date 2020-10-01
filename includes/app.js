//variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.cart .close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const trendingDOM =document.querySelector('.trending-center');
const newDOM =document.querySelector('.new-center');
const filterBtn = document.querySelector('.filter-btn');
const closeFilterBtn = document.querySelector('.close-filter');
const filterMenu = document.querySelector('.filter');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const filePath = "/wp2/wp-content/themes/project2/";
const searchBar = document.querySelector('.search-bar');
const results = document.querySelector('.search-results');
const clearSearchBtn = document.querySelector('.clear-search');
const voiceSearchBtn = document.querySelector('.voice-search');
const topBar = document.querySelector('.top-bar');
const btnNavLines = document.querySelectorAll('.btn-nav div');
const btnNav = document.querySelector('.btn-nav');
const topBarLi = document.querySelectorAll('.top-bar li');
const topBarA = document.querySelectorAll('.top-bar li a');
const mainNav = document.querySelector('.main-nav');
const logo = document.querySelector('.custom-logo');
const logoLink = document.querySelector('.custom-logo-link');
const navRightBtns = document.querySelectorAll('.rightside-btns i');
const navLinks = document.querySelectorAll('.top-bar li a');
const discoverRods = document.querySelector('.rods a'); 
const closeSignupBtn = document.querySelector('.signup button');
const openSignupBtn = document.querySelector('.newsletter button');
const signupWindow = document.querySelector('.signup');
const classes = document.body.classList;
const searchBtn = document.querySelector('.search-btn');
const searchWindow = document.querySelector('.search-window');
const closeSearchBtn = document.querySelector('.search-window .close-cart');



//cart that will be storing all the information
let cart = [];
let buttonsDOM = [];

//responsible for getting products via JSON, and then mapping them as objects into an array
class Products{
	async getProducts(){
		try{
			let result = await fetch(filePath +'includes/productsTEST.json'); 
			let products = await result.json(); 
			products = products.map(item =>{ 
				const title = item.title; 
				const price = item.price;
				const id = item.id; 
				const image = item.filename;
				const category1 = item.category1;
				const category2 = item.category2;
				const link = item.link;
				return {title, price, id, image, category1, category2, link};
			});
			return products;
		}catch (error){
			console.log(error);
		}
	}
}
class UI{
	//BEGINNING OF CART & PRODUCTS FUNCTIONS

	//displaying each product into the shop page
	displayAllProducts(products){
		let result = '';
		products.forEach(product => { 
			result += `
			<article class="product ${product.category1} ${product.category2}">
				<div class="img-container">
					<a href=${product.link}>
						<img src=${filePath+'/pics/images/'+product.image} alt="${product.title}" class="product-img" />
					</a>
					<button class="bag-btn" data-id=${product.id}>
						<i class="fas fa-shopping-cart"></i>
						Add to Cart
					</button>
				</div>
				<h3>${product.title}</h3> 
				<h4>$${product.price}</h4>
			</article>
			`
		});
		if(productsDOM){
			productsDOM.innerHTML = result;
		}
		//On page load, displays all products that are in the category of the checked checkboxes. Different from the filter functionality
		if(checkboxes){ 
			const displayedProducts = document.querySelectorAll('article.product');
			const checkedCheckboxes = [];
			checkboxes.forEach( checkbox =>{ 
				if(checkbox.checked){
					checkedCheckboxes.push(checkbox.getAttribute('name'));
				}
			});
			displayedProducts.forEach( product =>{ 
				if (!product.classList.contains(checkedCheckboxes[0]) && !product.classList.contains(checkedCheckboxes[1]) && !product.classList.contains(checkedCheckboxes[2]) && !product.classList.contains(checkedCheckboxes[3]) ){
					product.classList.add('hidden');
				}
			});
		}
	}
	//display products with trending category on front page
	displayTrendingProducts(products){
		let result = '';
		const trending = products.filter( i =>{
			return i.category1 === 'Trending' || i.category2 === 'Trending';
		});
		trending.forEach(product => {
			result += `
			<article class="product">
				<div class="img-container">
					<a href=${product.link}>
						<img src=${filePath+'/pics/images/'+product.image} alt="${product.title}" class="product-img" />
					</a>					
					<button class="bag-btn" data-id=${product.id}>
						<i class="fas fa-shopping-cart"></i>
						Add to Cart
					</button>
				</div>
				<h3>${product.title}</h3> 
				<h4>$${product.price}</h4>
			</article>
			`
		});
		if(trendingDOM){
			trendingDOM.innerHTML = result;
		}
	}
	//display products with new category on front page
	displayNewProducts(products){
		let result = '';
		const trending = products.filter( i =>{
			return i.category1 === 'New-Release' || i.category2 === 'New-Release';
		});
		trending.forEach(product => { 
			result += `
			<article class="product">
				<div class="img-container">
					<a href=${product.link}>
						<img src=${filePath+'/pics/images/'+product.image} alt="${product.title}" class="product-img" />
					</a>					
					<div class="tag-trending">
						<p>NEW</p>
					</div>
					<button class="bag-btn" data-id=${product.id}>
						<i class="fas fa-shopping-cart"></i>
						Add to Cart
					</button>
				</div>
				<h3>${product.title}</h3> 
				<h4>$${product.price}</h4>
			</article>
			`
		});
		if(trendingDOM){
			newDOM.innerHTML = result;
		}
	}
	//add to cart button functionality
	getBagButtons(){
		const buttons = [...document.querySelectorAll('.bag-btn')]; 
		buttonsDOM = buttons;
		buttons.forEach(button =>{
			let id = button.dataset.id;
			let inCart = cart.find(item => item.id === id);
			if(inCart){
				button.innerText = 'In Cart';
				button.disabled = true;
			}
			button.addEventListener('click', (e)=>{ 
				event.target.innerText = 'In Cart';
				event.target.disabled = true;
				let cartItem = {...Storage.getProduct(id), amount: 1};
				cart = [...cart, cartItem];
				Storage.saveCart(cart);
				this.setCartValues(cart);
				this.addCartItem(cartItem);
			});
		});
	}
	//looping through cart using map to get cart items and total cart price, and updating the HTML accordingly
	setCartValues(cart){ 
		let tempTotal = 0;
		let itemsTotal = 0;
		cart.map( item =>{
			tempTotal += item.price * item.amount;
			itemsTotal += item.amount;
		});
		cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
		cartItems.innerText = itemsTotal;
	}
	//adding the HTML for the corresponding item into the cart window by creating a new div and appending it to existing DOM element
	addCartItem(item){ 
		const div = document.createElement('div'); 
		div.classList.add('cart-item'); 
		div.innerHTML = `
			<img src=${filePath+'/pics/images/'+item.image} alt='product' />
			<div>
				<h4>${item.title}</h4>
				<h5>$${item.price}</h5>
				<button class="remove-item" data-id=${item.id}>
					Remove Item
				</button>
			</div>
			<div>
				<button class="increase-item arrow">
					<i class="fas fa-chevron-up" data-id=${item.id}></i>
				</button>
				<p class="item-amount">${item.amount}</p>
				<button class="decrease-item arrow">
					<i class="fas fa-chevron-down" data-id=${item.id}></i>
				</button>
			</div>
		`
		cartContent.appendChild(div);
	}
	//toggles classes for cart, making it slide in
	showCart(){ 
		cartOverlay.classList.add('transparentBcg');
		cartDOM.classList.add('showCart');
	}
	//checking localstorage upon page load to update UI for cart etc
	setupAPP(){ 
		cart = Storage.getCart();
		this.setCartValues(cart);
		this.populateCart(cart);
		cartBtn.addEventListener('click', this.showCart);
		closeCartBtn.addEventListener('click', this.hideCart);
	}
	//looping through cart to display each item in it
	populateCart(cart){
		cart.forEach( item => this.addCartItem(item));
	}
	//hiding cart 
	hideCart(){
		cartOverlay.classList.remove('transparentBcg');
		cartDOM.classList.remove('showCart');
	}
	//cart functionality
	cartLogic(){

		clearCartBtn.addEventListener('click', ()=>{ 
			this.clearCart();
		});

		//cart buttons functionality
		cartContent.addEventListener('click', e =>{
			//needed to create this ternary because pressing enter and clicking would target different elements 		
			let theEvent =(e.target.classList.contains('arrow')) ? e.target.childNodes[1] :  e.target ;
			if(theEvent.classList.contains('remove-item')){ 
				let removeItem = theEvent;
				let id = removeItem.dataset.id;
				cartContent.removeChild(removeItem.parentElement.parentElement); 
				this.removeItem(id); 
			}else if(theEvent.classList.contains('fa-chevron-up')){ 
				let addAmount = theEvent;
				let id = addAmount.dataset.id;
				let tempItem = cart.find( item => item.id ===id); 
				tempItem.amount = tempItem.amount + 1;
				Storage.saveCart(cart);
				this.setCartValues(cart); 
				addAmount.parentElement.nextElementSibling.innerText = tempItem.amount; 
			}else if(theEvent.classList.contains('fa-chevron-down')){ 
				let lowerAmount = theEvent;
				let id = lowerAmount.dataset.id;
				let tempItem = cart.find( item => item.id ===id);
				tempItem.amount = tempItem.amount - 1;
				if(tempItem.amount > 0){ 
					Storage.saveCart(cart); 
					this.setCartValues(cart);
					lowerAmount.parentElement.previousElementSibling.innerText = tempItem.amount;
				}else{ 
					cartContent.removeChild(lowerAmount.parentElement.parentElement.parentElement);
					this.removeItem(id);	
				}
			}
		});
		document.addEventListener('keyup', (e)=>{
			if(cartDOM.classList.contains('showCart') && e.key==='Escape'){
				this.hideCart();	
			}
		});
	}
	//run removeItem on all items in cart
	clearCart(){ 
		let cartItems = cart.map(item => item.id); 
		cartItems.forEach(id => this.removeItem(id)); 
		while(cartContent.children.length > 0){ 
			cartContent.removeChild(cartContent.children[0])
		}
		this.hideCart();
	}
	 //based on id passed, will remove item from cart and update cart
	removeItem(id){
		cart = cart.filter(item => item.id !==id); 
		this.setCartValues(cart);
		Storage.saveCart(cart);
		let button = this.getSingleButton(id);
		if (button){
			button.disabled = false;
			button.innerHTML = `<i class="fas fa-shopping-cart"></i>Add to Cart`;
		}
	}
	//grabbing "add to cart" button corresponding to id passed 
	getSingleButton(id){
		return buttonsDOM.find(button => button.dataset.id === id);
	}
	//END OF CART & PRODUCT FUNCTION

	//filter functionality
	filterLogic(){
		const displayedProducts = document.querySelectorAll('article.product');

		//toggling the filters by hiding each product that does not contain the class of the checkbox that is toggled
		function checkboxToggle(e){
			if(e.target.checked){
				displayedProducts.forEach(product =>{
					if(product.classList.contains(e.target.getAttribute('name')))
						product.classList.remove('hidden');
				});
			}else{
				displayedProducts.forEach(product =>{
					if(product.classList.contains(e.target.getAttribute('name')))
						product.classList.add('hidden');
				});
			}
		}
		//open filter menu
		function toggleFilterMenu(){
			filterMenu.classList.add('filter-active');
			cartOverlay.classList.add('transparentBcg');
		}
		//close filter menu
		function closeFilter(){
			filterMenu.classList.remove('filter-active');
			cartOverlay.classList.remove('transparentBcg');
		}
		//adding product count beside each filter: rods
		const rodText = document.querySelector('label[for="Rods"]')
		const rodCount = ((Array.from(displayedProducts)).filter( product =>{
			return product.classList.contains('Rods');
		})).length;
		rodText.innerHTML += ` (${rodCount})`;
		//reels
		const reelText = document.querySelector('label[for="Reels"]')
		const reelCount = ((Array.from(displayedProducts)).filter( product =>{
			return product.classList.contains('Reels');
		})).length;
		reelText.innerHTML += ` (${reelCount})`;
		//lures
		const lureText = document.querySelector('label[for="Lures"]')
		const lureCount = ((Array.from(displayedProducts)).filter( product =>{
			return product.classList.contains('Lures');
		})).length;
		lureText.innerHTML += ` (${lureCount})`;
		//fishing tackle
		const ftText = document.querySelector('label[for="Fishing-Tackle"]')
		const ftCount = ((Array.from(displayedProducts)).filter( product =>{
			return product.classList.contains('Fishing-Tackle');
		})).length;
		ftText.innerHTML += ` (${ftCount})`;

		
		checkboxes.forEach( checkbox => checkbox.addEventListener('change', checkboxToggle));
		checkboxes.forEach( checkbox => checkbox.addEventListener('keyup', (e)=>{
			if(e.key !=='Enter') return;
			(e.target.checked) ? e.target.checked = false : e.target.checked = true;
			checkboxToggle(e);
		}));
		filterBtn.addEventListener('click', toggleFilterMenu);
		closeFilterBtn.addEventListener('click', closeFilter);
		document.addEventListener('keyup', (e)=>{
			if(filterMenu.classList.contains('filter-active') && e.key==='Escape'){
				closeFilter();	
			}
		});
		filterBtn.addEventListener('keyup', (e)=>{
			if(filterMenu.classList.contains('filter-active') && e.key==='Enter'){
				document.querySelector('#Rods').focus();	
			}
		});
	}
	//search functionality
	searchLogic(){ 

		//START OF VOICE SEARCH FEATURE
		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition(); 
		recognition.interimResults = false ; 
		recognition.continuous = false;
		recognition.maxAlternatives = 1;
		
		voiceSearchBtn.addEventListener('click', e =>{
			this.clearSearchBar();
			voiceSearchBtn.classList.add('voice-search-active');
			recognition.start(); 
		});
		//when the speech recognition recognizes words, create a string of those results and then pass it through displayMatches
		recognition.addEventListener('result', e =>{
		  	let transcript = Array.from(e.results)
		  		.map(result => result[0])
		  		.map(result => result.transcript)
		  		.join('');
		  	if(e.results[0].isFinal){
		  		console.log(transcript);
		  		this.displayMatches(transcript);
		  	}
		});
		recognition.addEventListener('end', e =>{
			voiceSearchBtn.classList.remove('voice-search-active');
			recognition.stop();
		});
		//END OF VOICE SEARCH FEATURE

		//smooth scroll to top when opening search window
		function open(){
			searchWindow.classList.add('search-active');
			window.scrollTo({ top: 0, behavior: 'smooth' });	
		}
		//close search window
		function close(){
			searchWindow.classList.remove('search-active');
		}

		searchBar.addEventListener('input', this.displayMatches);
		clearSearchBtn.addEventListener('click', this.clearSearchBar);
		searchBtn.addEventListener('click', open);
		closeSearchBtn.addEventListener('click', close);
		document.addEventListener('keyup', (e)=>{
			if(searchWindow.classList.contains('search-active') && e.key==='Escape'){
				close();	
			}
			if(searchWindow.classList.contains('search-active') && e.key==='Enter'){
				setTimeout(()=>{
					searchBar.focus();
				},1000);	
			}
		});
		searchBtn.addEventListener('keyup', (e)=>{
			if(searchWindow.classList.contains('search-active') && e.key==='Enter'){
				setTimeout(()=>{
					searchBar.focus();
				},1000);	
			}
		});
	}
	//displaying the matches for whatever is typed or spoken into search bar
	displayMatches(e){
		const word = (e.type == 'input')? this.value : e;//create a ternary for either text input or voice input
		const allProducts = Array.from(JSON.parse(localStorage.getItem('products')));
		const matchArray = findMatches(word, allProducts);
		const html = matchArray.map(product => {  //creating a variable that will store new html in the form of a list item . Product is each item in the array (which is an object) and will be put through the multiple functions below
		    const regex = new RegExp(word, 'gi'); //creating a RegExp variable to pass whatever is typed into the search bar into the below functions
		    const productName = product.title.replace(regex, `<span class="hl">${word}</span>`); //accesses the object and takes the product title, then replaces all text that matches regex (aka what is typed into the search bar) with the same text except wrapped around a span of class hl. This essentially highlights whatever is typed into the search bar due to the styling of the span
		    return `
		      <li>
		        <a href=${product.link}><span class= "product">${productName}</span></a>
		      </li>
		      `; 
		}).join(''); 
		results.innerHTML = html; 
		if (word.length < 1){
			results.innerHTML = '';
		}
		if (word.length > 0 && matchArray.length == 0){
			results.innerHTML = `
			<li class="no-match">
	       		Sorry, no results found for "${word}".
	     	</li>
			`
		}
		//creating function that filters down the array items to match wordToMatch and places them into a new array
		function findMatches(wordToMatch, allProducts){ 
			return allProducts.filter(product => { 
				const regex = new RegExp(wordToMatch, 'gi'); //creating a RegExp as a variable to pass through .match() since you cannot use wordToMatch. 'g' is global and 'i' is case insensitive
				return product.title.match(regex); //returns all array items where the product title contains what is passed as wordToMatch
			});
		}
	}
	//removes all suggestions and text from search bar
	clearSearchBar(){ 
		searchBar.value = '';
		results.innerHTML = '';
	}
	//navigation functionality
	navLogic(){
		//slides the navbar in and out
		function toggleNav(){
			topBar.classList.toggle('top-bar-active');
			topBarLi.forEach( li => li.classList.toggle('active-li'));
			btnNav.classList.toggle('toggle'); 
		}
		//minimizing the navbar and making it transparent after certain height scrolled
		function reduce(){
			if(window.scrollY > 100){
				mainNav.classList.add('minify');
				topBar.classList.add('top-bar-minify');
				logo.classList.add('invert');
				navRightBtns.forEach ( i => i.classList.add('invert'));
				btnNavLines.forEach( line => line.classList.add('invert'));
				if(window.innerWidth >= 1280){
					return navLinks.forEach( link => link.classList.add('white-text'));
				}
			}else if (window.scrollY <= 100){
				mainNav.classList.remove('minify');
				topBar.classList.remove('top-bar-minify');
				logo.classList.remove('invert');
				navRightBtns.forEach ( i => i.classList.remove('invert'));
				btnNavLines.forEach( line => line.classList.remove('invert'));
				if(window.innerWidth > 1280){
					return navLinks.forEach( link => link.classList.remove('white-text'));
				}
			}
		}

		window.addEventListener('scroll', reduce)
		btnNav.addEventListener('click', toggleNav);
		document.addEventListener('keyup', (e)=>{
			if(topBar.classList.contains('top-bar-active') && e.key==='Escape'){
				toggleNav();	
			}	
		});
		btnNav.addEventListener('keyup', (e)=>{	
			if(topBar.classList.contains('top-bar-active') && e.key==='Enter'){
				document.querySelector('#menu-item-80 > a').focus();
			}
		});
		topBarA.forEach( a => a.tabIndex = 1);
		logoLink.tabIndex = 1;		
	}
	//signup functionality
	signupLogic(){
		//close signup window
		function close(){
			signupWindow.classList.remove('signup-active');
		}
		//open signup window
		function open(){
			signupWindow.classList.add('signup-active');
		}
		if (closeSignupBtn){
			closeSignupBtn.addEventListener('click', close);
			openSignupBtn.addEventListener('click', open);

			document.addEventListener('keyup', (e)=>{
				if(signupWindow.classList.contains('signup-active') && e.key==='Escape'){
					close();	
				}	
			});
			openSignupBtn.addEventListener('keyup', (e)=>{
				if(signupWindow.classList.contains('signup-active') && e.key==='Enter'){
					document.querySelector('body > form > div > input:nth-child(3)').focus();
				}	
			});
			if (window.location.href === "http://localhost/wp2/?signup=success"){
				setTimeout(()=>{
					alert("Thank you for subscribing to our newsletter!");
					window.location.href = "http://localhost/wp2/";
				},500);
			}
		}	
	}
	//function that shortly disables transitions animations after window resize
	transitionTimeout(){
		let timer = 0;
		window.addEventListener('resize', function () {
		    if (timer) {
		        clearTimeout(timer);
		        timer = null;
		    }else{
		        classes.add('stop-transitions');
		    }
		    timer = setTimeout(() => {
		        classes.remove('stop-transitions');
		        timer = null;
		    }, 100);
		});
	}
}
//local storage functions
class Storage{
	static saveProducts(products){
		localStorage.setItem('products', JSON.stringify(products));
	}
	static getProduct(id){
		let products = JSON.parse(localStorage.getItem('products'));
		return products.find(product => product.id ===id);
	}
	static saveCart(cart){
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	static getCart(){ 
		return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	}
}

//creating new instances for classes
document.addEventListener('DOMContentLoaded', ()=>{
	const ui = new UI(); 
	const products = new Products(); 
	
	ui.setupAPP();

	products.getProducts().then(products =>{
		ui.displayAllProducts(products);
		ui.displayTrendingProducts(products);
		ui.displayNewProducts(products);
		Storage.saveProducts(products);
	}).then(()=>{
		ui.getBagButtons();
		ui.cartLogic();
		ui.searchLogic();
		ui.navLogic();
		ui.signupLogic();
		ui.transitionTimeout();
		if(filterBtn){
			ui.filterLogic();
		}
	});
});

//since the event listener is DOMContentLoaded, cannot be part of classes
function rodsFilter(){
	function checkTrue(){ //changes localstorage value to uncheck
		localStorage.setItem('uncheck', 'uncheck');
	}
	function checkFalse(){ //changes localstorage value to check
		localStorage.setItem('uncheck', 'check');
	}
	function uncheck(){ // if localstorage value is 'uncheck', all checkboxes other than 'Rods' will be unchecked
		if (localStorage.getItem('uncheck')==='uncheck'){
			checkboxes.forEach( checkbox =>{
				if(checkbox.getAttribute('name') !=='Rods'){
					checkbox.checked = false;
				}
			});
		}
	}
	if (discoverRods){ 
		discoverRods.addEventListener('click', checkTrue);
	}else{
		document.addEventListener('click', checkFalse);
	}
	document.addEventListener('DOMContentLoaded', uncheck); //on page load, runs uncheck
}
rodsFilter();







