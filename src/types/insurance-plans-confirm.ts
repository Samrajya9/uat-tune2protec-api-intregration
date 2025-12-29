export interface Header {
  PNR: string; // Required - Booking reference number
  PurchaseDate: string; // Required - ISO date (e.g., "2025-12-29T09:00:00")
  SSRFeeCode: string; // Required - Insurance fee code from plans response
  Currency: string; // Required - 3-letter currency code (e.g., "NPR")
  TotalPremium: number; // Required - Total insurance premium
  CountryCode: string; // Required - 2-letter country code (e.g., "NP")
  TotalAdults: number; // Required - Number of adult passengers
  TotalChild: number; // Required - Number of child passengers
  TotalInfants: number; // Required - Number of infant passengers
}
// Note: Channel and CultureCode can be defaulted in your code

export interface ContactDetails {
  ContactPerson: string; // Required - Primary contact name
  Address1: string; // Required - Primary address line
  Address2: string; // Optional
  Address3: string; // Optional
  MobilePhoneNum: string; // Required - Mobile number
  HomePhoneNum: string; // Optional
  OtherPhoneNum: string; // Optional
  PostCode: string; // Required - Postal/ZIP code
  City: string; // Required - City name
  State: string; // Required - State/Province
  Country: string; // Required - 2-letter country code
  EmailAddress: string; // Required - Email address
}

export interface Flights {
  DepartCountryCode: string; // Required - 2-letter departure country code
  DepartStationCode: string; // Required - 3-letter airport code (e.g., "KTM")
  ArrivalCountryCode: string; // Required - 2-letter arrival country code
  ArrivalStationCode: string; // Required - 3-letter airport code (e.g., "SYD")
  DepartAirlineCode: string; // Required - 2-letter airline code (e.g., "QF")
  DepartDateTime: string; // Required - ISO date (e.g., "2025-12-30T09:15:00")
  DepartFlightNo: string; // Required - Flight number (e.g., "QF68")
  ReturnAirlineCode?: string; // Optional - 2-letter airline code (e.g., "QF")
  ReturnDateTime?: string; // Optional - ISO date (e.g., "2025-12-30T09:15:00")
  ReturnFlightNo?: string; // Optional - Flight number (e.g., "QF68")
}

export interface Passengers {
  // Required for EACH passenger:
  IsInfant: string; // Required - "true" or "false"
  FirstName: string; // Required
  LastName: string; // Required
  Gender: number; // Required - 1 (Male), 2 (Female)
  DOB: string; // Required - YYYY-MM-DD
  Age: string; // Required - Age as string
  IdentityType: number; // Required - 1 (Passport), check for other codes
  IdentityNo: string; // Required - Document number
  IsQualified: boolean; // Optional - Defaults to true
  Nationality: string; // Required - 2-letter country code
  CountryOfResidence: string; // Required - 2-letter country code
  SelectedPlanCode: string; // Required - Plan code from available plans
  SelectedSSRFeeCode: string; // Required - SSR fee code from available plans
  CurrencyCode: string; // Required - 3-letter currency code
  PassengerPremiumAmount: number; // Required - Premium for this passenger
  EmailAddress: string; // Required
  PhoneNumber: string; // Required
  Address: string; // Required - Passenger address
  // Optional:
  ExtraInfo?: {
    // Optional - Additional riders/options
    ItemID: number; // Optional
    ItemKeyName: string; // Optional
    ItemDesc: string; // Optional
  }[];
}
