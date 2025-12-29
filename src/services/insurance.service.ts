import config from "../config/index.js";
import type {
  InsurancePlansConfirmRequest,
  InsurancePlansRequest,
} from "../types/t2p.js";

const T2P_BASE_URL = "https://uat-tpe.tune2protect.com/RestZeusAPI/api/Zeus";

/**
 * Checks credit balance from T2P API
 * @param currencyCode - Currency code (e.g., "NPR")
 * @param countryCode - Country code (e.g., "NP")
 * @returns Promise with credit balance information
 * @throws Error if the API request fails
 */
export async function checkCreditBalance(
  currencyCode: string,
  countryCode: string
) {
  const payload = {
    Username: config.Username,
    Password: config.Password,
    CurrencyCode: currencyCode,
    CountryCode: countryCode,
  };

  const response = await fetch(`${T2P_BASE_URL}/CheckCreditBalance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to check credit balance: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data;
}

/**
 * Fetches available insurance plans from T2P API
 * @param request - The insurance plans request payload
 * @returns Promise with available insurance plans
 * @throws Error if the API request fails
 */
export async function getAvailablePlans(request: InsurancePlansRequest) {
  const {
    header: { adults, children, infants, currency, nationality },
    flights: {
      departureTime,
      origin,
      originCountry,
      destination,
      destinationCountry,
      airlineCode,
      flightNumber,
    },
  } = request;

  const payload = {
    Authentication: {
      Username: config.Username,
      Password: config.Password,
    },
    Header: {
      Channel: "OTA",
      CultureCode: "en-US",
      Currency: currency.toUpperCase(),
      CountryCode: nationality.toUpperCase(),
      TotalAdults: adults,
      TotalChild: children,
      TotalInfants: infants,
    },
    Flights: {
      DepartCountryCode: originCountry.toUpperCase(),
      DepartStationCode: origin.toUpperCase(),
      ArrivalCountryCode: destinationCountry.toUpperCase(),
      ArrivalStationCode: destination.toUpperCase(),
      DepartAirlineCode: airlineCode.toUpperCase(),
      DepartDateTime: departureTime,
      DepartFlightNo: flightNumber.toUpperCase(),
    },
  };

  const response = await fetch(
    `${T2P_BASE_URL}/GetAvailablePlansOTAWithRiders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch insurance plans: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  // TODO - handling API-level errors
  // Check for API-level errors
  //   if (data.errorCodeField && data.errorCodeField !== "0") {
  //     throw new Error(
  //       data.errorMessageField || "Unknown error from insurance provider"
  //     );
  //   }

  return data;
}

/**
 * Confirms insurance purchase with T2P API
 * @param request - The purchase confirmation request payload
 * @returns Promise with purchase confirmation details
 * @throws Error if the API request fails
 */
export async function confirmPurchase(
  request: InsurancePlansConfirmRequest
): Promise<any> {
  const payload = {
    Authentication: {
      Username: config.Username,
      Password: config.Password,
    },
    Header: {
      Channel: "OTA",
      CultureCode: "en-US",
      ...request.Header,
    },
    ContactDetails: request.ContactDetails,
    Flights: request.Flights,
    Passengers: request.Passengers,
  };

  const response = await fetch(`${T2P_BASE_URL}/ConfirmPurchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to confirm purchase: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  // TODO - handling API-level errors
  // Check for API-level errors
  //   if (data.errorCodeField && data.errorCodeField !== "0") {
  //     throw new Error(
  //       data.errorMessageField || "Unknown error from insurance provider"
  //     );
  //   }

  return data;
}
