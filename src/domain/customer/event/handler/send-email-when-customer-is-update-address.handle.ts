import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerUpdateAddressEvent from "../customer-update-address.event";

export default class SendEmailWhenCustomerIsUpdateAddressHandler
  implements EventHandlerInterface<CustomerUpdateAddressEvent>
{
  handle(event: CustomerUpdateAddressEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`); 
  }
}
