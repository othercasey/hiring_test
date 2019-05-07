import { Selector, t } from 'testcafe'; // first import testcafe selectors

fixture `Getting Started`// declare the fixture
    .page `https://ecommerce-app.cosmicapp.co`;  // specify the start page

//then create a test and place your code there
test('Buy the silver watch', async t => {

  // Questions
    // How do I write a wrapper around the Expects function so I don't forget pieces of it?
    // Best practices around formatting

  // Working Objects
    // Homepage Objects
    const silverButton          = Selector('.list-group-item')
                                  .withText('Silver');
    const silverWatch           = Selector('.col-sm-4')
                                  .withText('RHINE');
    const addToCartButton       = Selector('.btn')
                                  .withText('Add to Cart');
    const cartButton            = Selector('.navbar-right')
                                  .withText('1');
  
    // Cart Objects 
    const itemPrice             = Selector('.ng-binding')
                                   .withText('160');
    const cartPrice             = Selector('.text-right')
                                   .withText('160');
    const checkoutButton        = Selector('.btn')
                                   .withText('Checkout');
  
    // Checkout Objects 
    const formFieldFirstName    = Selector('div.form-group')
                                  .find('input')
                                  .withAttribute('name', 'firstName');
    const formFieldLastName     = Selector('div.form-group')
                                  .find('input')
                                  .withAttribute('name', 'lastName');
    const formFieldAddress      = Selector('div.form-group')
                                  .find('input')
                                  .withAttribute('name', 'address');
    const formFieldCity         = Selector('div.form-group')
                                  .find('input')
                                  .withAttribute('name', 'city');
    const formFieldPostalCode   = Selector('div.form-group')
                                  .find('input')
                                  .withAttribute('name', 'postalCode');
    const formFieldPhone        = Selector('div.form-group')
                                  .find('input')
                                  .withAttribute('name', 'phone');
    const formFieldEmail        = Selector('div.form-group')
                                  .find('input')
                                  .withAttribute('name', 'email');
    const completeOrderButton   = Selector('.btn')
                                  .withText('Complete Order');

    // Modal objects
      const stripeIframe        = Selector('iframe')
                                  .withAttribute('name', 'stripe_checkout_app');
      const stripeIframeEmail   = Selector('.Modal-form')
                                  .find('input')
                                  .withAttribute('type', 'email');
      const stripeIframeCC      = Selector('.Modal-form')
                                  .find('input')
                                  .withAttribute('autocomplete', 'cc-number');
      const stripeIframeExp     = Selector('.Modal-form')
                                  .find('input')
                                  .withAttribute('autocomplete', 'cc-exp');
      const stripeIframeCVC     = Selector('.Modal-form')
                                  .find('input')
                                  .withAttribute('maxlength', '4');
      const stripeIframeButton  = Selector('div.Section-button');


    await t
      // Filter by Silver watches
        .expect(silverButton.exists).ok('No Silver Button')
        .click(silverButton)
        .expect(silverWatch.exists).ok('No RHINE watch')
      
      // Add the Silver watch to your cart
        .expect(addToCartButton.exists).ok('No Add to Cart button')
        .click(addToCartButton)

      // Verify that an item was added to the cart
        .expect(cartButton.exists).ok('No Cart button in topnav')
        .expect(cartButton.exists).ok('Incorrect item count')
        .click(cartButton)

      // Check that the item and cart prices are correct
        .expect(itemPrice.exists).ok('Incorrect item price')
        .expect(cartPrice.exists).ok('Incorrect cart price')

      // Proceed to checkout
        .expect(checkoutButton.exists).ok('No Checkout button')
        .click(checkoutButton)

      // Fill in shipping information
        .expect(formFieldFirstName.exists).ok('Cant find field')
        .typeText(formFieldFirstName, 'Casey')
        .typeText(formFieldLastName, 'Greene')
        .typeText(formFieldAddress, '123 Test Street')
        .typeText(formFieldCity, 'Los Gatos')
        .typeText(formFieldPostalCode, '95032')
        .typeText(formFieldPhone, '555-555-5555')
        .typeText(formFieldEmail, 'hello@test.com')
        .expect(completeOrderButton.exists).ok('No Complete Order button or disabled')
        .click(completeOrderButton)

      // Fill in billing information
        .expect(stripeIframe.exists).ok('Cant find iframe')
        .switchToIframe(stripeIframe)
        .typeText(stripeIframeEmail, 'hello@test.com')
        .typeText(stripeIframeCC, '4242 4242 4242 4242')
        .typeText(stripeIframeExp, '12/24')
        .typeText(stripeIframeCVC, '777')
        .click(stripeIframeButton)

      // Make sure the Modal goes away
        .expect(stripeIframe.exists).notOk('Modal still visible');
});
