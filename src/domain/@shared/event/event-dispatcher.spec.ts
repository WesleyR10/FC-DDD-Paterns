import Customer from "../../customer/entity/customer";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerUpdateAddressEvent from "../../customer/event/customer-update-address.event";
import SendEmailWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-email-when-customer-is-created.handler";
import SendEmailWhenCustomerIsCreatedHandler2 from "../../customer/event/handler/send-email-when-customer-is-created.handler2";
import SendEmailWhenCustomerIsUpdateAddressHandler from "../../customer/event/handler/send-email-when-customer-is-update-address.handle";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  describe("Product", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
  
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        1
      );
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });
  
    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
  
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
  
      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
  
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        0
      );
    });
  
    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
  
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
  
      eventDispatcher.unregisterAll();
  
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
    });
  
    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");
  
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
  
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
  
      const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        price: 10.0,
      });
  
      // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
      eventDispatcher.notify(productCreatedEvent);
  
      expect(spyEventHandler).toHaveBeenCalled();
    });
  })
  describe("Customer", () => {
    it("should register two event handlers", () => {
      const eventDispatcher = new EventDispatcher();
  
      const customerEventHandler1 = new SendEmailWhenCustomerIsCreatedHandler();
      const customerEventHandler2 = new SendEmailWhenCustomerIsCreatedHandler2();
  
      eventDispatcher.register("CustomerCreatedEvent", customerEventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", customerEventHandler2);
      
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
        2
      );
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(customerEventHandler1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(customerEventHandler2);
  
      
    });

it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    
    const customerEventHandler1 = new SendEmailWhenCustomerIsCreatedHandler();
    const customerEventHandler2 = new SendEmailWhenCustomerIsCreatedHandler2();

    eventDispatcher.register("CustomerCreatedEvent", customerEventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", customerEventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(customerEventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(customerEventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify customer create event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventConsoleLog1Handler = new SendEmailWhenCustomerIsCreatedHandler();
    const eventConsoleLog2Handler = new SendEmailWhenCustomerIsCreatedHandler2();

    const spyEventConsoleLogHandler = jest.spyOn(eventConsoleLog1Handler, "handle");
    const spyEventConsoleLogHandler2 = jest.spyOn(eventConsoleLog2Handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", eventConsoleLog2Handler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventConsoleLog1Handler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventConsoleLog2Handler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
      Address: {
        street: "Street 1",
        number: "1",
        zip: "32807-002",
        city: "Minas Gerais"
      }
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventConsoleLogHandler).toHaveBeenCalled();
    expect(spyEventConsoleLogHandler2).toHaveBeenCalled();
  });

  
  it("should notify update customer address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventConsoleLogHandler = new SendEmailWhenCustomerIsUpdateAddressHandler();
    
    const spyEventConsoleLogHandler = jest.spyOn(eventConsoleLogHandler, "handle");

    eventDispatcher.register("CustomerUpdateAddressEvent", eventConsoleLogHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerUpdateAddressEvent"][0]
    ).toMatchObject(eventConsoleLogHandler);

    
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;
    
    const newAddress = new Address("Street 7", 123, "01110-250", "São Paulo");
    customer.changeAddress(newAddress)

    const customerUpdateAddressEvent = new CustomerUpdateAddressEvent(customer);

    eventDispatcher.notify(customerUpdateAddressEvent);

    expect(spyEventConsoleLogHandler).toHaveBeenCalled();
  });
  })
});
