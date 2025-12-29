import type {
  ContactDetails,
  Flights,
  Header,
  Passengers,
} from "./insurance-plans-confirm.js";

export interface CreditAccount {
  AccountId?: string;
  Balance?: number;
  Currency?: string;
  // add more fields if upstream API provides
}

export interface CheckCreditBalanceResponse {
  statusCodeField: number;
  statusDescriptionField: string;
  accountsField: CreditAccount[];
  PropertyChanged: any | null;
}

/**
 * Interface representing the structure of an Insurance Plans Request.
 */
export interface InsurancePlansRequest {
  header: {
    adults: number;
    children: number;
    infants: number;
    currency: string;
    nationality: string;
  };
  flights: {
    departureTime: string;
    origin: string;
    originCountry: string;
    destination: string;
    destinationCountry: string;
    airlineCode: string;
    flightNumber: string;
  };
}

export interface InsurancePlansConfirmRequest {
  Header: Header;
  ContactDetails: ContactDetails;
  Flights: Flights;
  Passengers: Passengers[];
}
