import { Publisher, Subjects, TicketUpdatedEvent } from "@zpticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
