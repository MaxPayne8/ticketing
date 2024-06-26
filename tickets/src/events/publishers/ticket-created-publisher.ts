import { Publisher, Subjects, TicketCreatedEvent } from "@zpticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
