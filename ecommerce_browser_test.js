import { Selector, t } from 'testcafe'; // first import testcafe selectors

fixture `Getting Started`// declare the fixture
    .page `https://ecommerce-app.cosmicapp.co`;  // specify the start page

//then create a test and place your code there
test('Buy the silver watch', async t => {

  // Questions
    // How do I write a wrapper around the Expects function so I don't forget pieces of it?
    // Best practices around formatting
    // Modal probably needs to talk to a div inside a div
    // I bet this bad boy handles some of that stuff: setNativeDialogHandler
    // But Stripe's modal isn't Native - it's JS.
    // Stripe's modal is a dang iframe

  // Working Objects
    // Homepage Objects
    const silverButton    = Selector('.list-group-item')
                            .withText('Silver');
    const silverWatch     = Selector('.col-sm-4')
                            .withText('RHINE');
    const addToCartButton = Selector('.btn')
                            .withText('Add to Cart');
    const cartButton      = Selector('.navbar-right')
                            .withText('1');

    // Cart Objects
    const itemPrice      = Selector('.ng-binding')
                            .withText('160');
    const cartPrice      = Selector('.text-right')
                            .withText('160');
    const checkoutButton = Selector('.btn')
                            .withText('Checkout');

    // Checkout Objects
    const formFieldFirstName  = Selector('div.form-group')
                                .find('input')
                                .withAttribute('name', 'firstName');
    const formFieldLastName   = Selector('div.form-group')
                                .find('input')
                                .withAttribute('name', 'lastName');
    const formFieldAddress    = Selector('div.form-group')
                                .find('input')
                                .withAttribute('name', 'address');
    const formFieldCity       = Selector('div.form-group')
                                .find('input')
                                .withAttribute('name', 'city');
    const formFieldPostalCode = Selector('div.form-group')
                                .find('input')
                                .withAttribute('name', 'postalCode');
    const formFieldPhone      = Selector('div.form-group')
                                .find('input')
                                .withAttribute('name', 'phone');
    const formFieldEmail      = Selector('div.form-group')
                                .find('input')
                                .withAttribute('name', 'email');
    const completeOrderButton = Selector('.btn')
                                .withText('Complete Order');

  // Still in Contention
    // Modal objects
    // const modaldialogFrame = Selector('.modal-dialog-content.script-app-contents iframe');
    // const sandboxFrame = Selector('#sandboxFrame');
    // const userHtmlFrame = Selector('#userHtmlFrame');

    const modalFloater    = Selector('div.container');
    const iframeya        = Selector('iframe');
    const modalEmail      = Selector('.CardField-email')
    const modalNumber     = Selector('.CardField-number')
    const modalExpiry     = Selector('.CardField-expiry')
    const modalCVC        = Selector('.CardField-cvc')
    const modalZip        = Selector('.CardField-postalCode')

    // const modalFormEmail  = Selector('.bf22a60-7008-11e9-8689-61854e0391d4')
    //                         .find('input')
    //                         .withAttribute('placeholder', 'Email');
    const modalFormNumber = Selector('div.Section-content')
                            .find('input')
                            .withAttribute('placeholder', 'Card number');
    // const modalExp        = Selector('div.Section-content')
    //                         .find('input')
    //                         .withAttribute('placeholder', 'MM / YY');
    // const modalCVC        = Selector('div.Section-content')
    //                         .find('input')
    //                         .withAttribute('placeholder', 'CVC');
    // const modalPayButton  = Selector('div.Button-content');

    async function inputCardData (cardElementSelector, { 
      cardNumber, cardExpiry, cardCVC, postalCode }) {                                           
      await t                                                                                                                                     
          .switchToIframe(Selector(cardElementSelector).find('iframe')) // Switch to the secure payment iframe                                    
          // .typeText(modalEmail, cardEmail)
          .typeText(modalNumber, cardNumber)                                                                                              
          .typeText(modalExpiry, cardExpiry)                                                                                              
          .typeText(modalCVC, cardCVC)                                                                                                    
          .typeText(modalZip, postalCode)
          // .typeText(modalEmail, cardEmail)
          .switchToMainWindow();                                                                                         
      } 
      // https://testcafe-discuss.devexpress.com/t/entering-a-test-credit-card-into-stripe-card-element/913


    await t
    // working test
      // Filter by Silver watches
        .expect(silverButton.exists).ok('No Silver Button')
        .click(silverButton)
        .expect(silverWatch.exists).ok('No RHINE watch') // Super mad I can't make this more general, these classes suck
      
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


    // not working yet
      // Fill in billing information
      await t.switchToIframe('iframe') // Switch to the example code widget, 
                                       // skip this step for the StripeJS widget 
                                       // embedded in a production page 
      
      .expect(iframeya.exists).ok('iframe is lost in space')
                                                                                                                                       
      await inputCardData('#card-element', {                                                                                                      
          // cardEmail:  'hello@test.com', 
          cardNumber: '4242 4242 4242 4242',                                                                                                      
          cardExpiry: '12/24',                                                                                                                    
          cardCVC:    '777',                                                                                                                      
          postalCode: '12345'                                                                                                                     
      });  
      // https://testcafe-discuss.devexpress.com/t/entering-a-test-credit-card-into-stripe-card-element/913

      // await browser.switchToIframe(modaldialogFrame);
      // await browser.switchToIframe(sandboxFrame);
      // await browser.switchToIframe(userHtmlFrame);
    
      // await browser.expect(Selector('#email').exists).ok();

        // .setNativeDialogHandler(() => true)
        // .expect(modalFloater.exists).ok('Modal not loading')
        // .expect(modalFormEmail.exists).ok('Cant find Email field')
        // .typeText(modalFormEmail, 'hello@test.com')
        // .typeText(modalFormNumber, '4242424242424242')
        // .typeText(modalExp, '1122')
        // .typeText(modalCVC, '123')
        // .expect(modalPayButton.exists).ok('No modal Pay button')
        // .click(modalPayButton)

      // Make sure the Modal goes away
        // .wait(100)
        // .expect(modalFloater.exists).notOk('Modal still visible');
});
