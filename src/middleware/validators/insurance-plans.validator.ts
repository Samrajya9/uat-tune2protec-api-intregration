import type { InsurancePlansRequest } from "../../types/t2p.js";
import { ValidationResult, validators } from "../../utils/validation.js";

/**
 * Validates the Insurance Plans Request body.
 * @param body - The request body to validate.
 * @returns A ValidationResult containing any errors found and validated data.
 */
export function validateInsurancePlansRequest(
  body: any
): ValidationResult<InsurancePlansRequest> {
  // Step 1: Initialize the validation result object with the type
  const result = new ValidationResult<InsurancePlansRequest>();

  // Step 2: Check if the request body itself is provided and is an object
  if (!body || typeof body !== "object") {
    result.addError("body", "Request body is required");
    return result;
  }

  // Step 3: Validate that the 'header' property exists and is an object
  if (!body.header || typeof body.header !== "object") {
    result.addError("header", "Header object is required");
    return result;
  }

  // Step 4: Validate that the 'flights' property exists and is an object
  if (!body.flights || typeof body.flights !== "object") {
    result.addError("flights", "Flights object is required");
    return result;
  }

  // Step 5: Destructure header and flights for easier access
  const { header, flights } = body;

  // --- Validate Header Fields ---

  // Step 6: Validate 'adults' count
  if (!validators.isNumber(header.adults)) {
    result.addError("header.adults", "Adults must be a number");
  } else if (!validators.minValue(header.adults, 1)) {
    result.addError("header.adults", "At least 1 adult is required");
  }

  // Step 7: Validate 'children' count
  if (!validators.isNumber(header.children)) {
    result.addError("header.children", "Children must be a number");
  } else if (!validators.minValue(header.children, 0)) {
    result.addError("header.children", "Children count cannot be negative");
  }

  // Step 8: Validate 'infants' count
  if (!validators.isNumber(header.infants)) {
    result.addError("header.infants", "Infants must be a number");
  } else if (!validators.minValue(header.infants, 0)) {
    result.addError("header.infants", "Infants count cannot be negative");
  }

  // Step 9: Validate 'currency' code
  if (
    !validators.isString(header.currency) ||
    !validators.isNotEmpty(header.currency)
  ) {
    result.addError("header.currency", "Currency is required");
  } else if (!validators.hasLength(header.currency, 3)) {
    result.addError(
      "header.currency",
      "Currency must be a 3-letter code (e.g., NPR, USD)"
    );
  }

  // Step 10: Validate 'nationality' country code
  if (
    !validators.isString(header.nationality) ||
    !validators.isNotEmpty(header.nationality)
  ) {
    result.addError("header.nationality", "Nationality is required");
  } else if (!validators.hasLength(header.nationality, 2)) {
    result.addError(
      "header.nationality",
      "Nationality must be a 2-letter country code (e.g., NP, US)"
    );
  }

  // --- Validate Flights Fields ---

  // Step 11: Validate 'departureTime'
  if (
    !validators.isString(flights.departureTime) ||
    !validators.isNotEmpty(flights.departureTime)
  ) {
    result.addError("flights.departureTime", "Departure time is required");
  } else if (!validators.isDateString(flights.departureTime)) {
    result.addError(
      "flights.departureTime",
      "Departure time must be a valid ISO 8601 date string"
    );
  } else if (!validators.isFutureDate(flights.departureTime)) {
    result.addError(
      "flights.departureTime",
      "Departure time must be in the future"
    );
  }

  // Step 12: Validate 'origin' airport code
  if (
    !validators.isString(flights.origin) ||
    !validators.isNotEmpty(flights.origin)
  ) {
    result.addError("flights.origin", "Origin is required");
  } else if (!validators.hasLength(flights.origin, 3)) {
    result.addError(
      "flights.origin",
      "Origin must be a 3-letter airport code (e.g., KTM)"
    );
  }

  // Step 13: Validate 'originCountry' code
  if (
    !validators.isString(flights.originCountry) ||
    !validators.isNotEmpty(flights.originCountry)
  ) {
    result.addError("flights.originCountry", "Origin country is required");
  } else if (!validators.hasLength(flights.originCountry, 2)) {
    result.addError(
      "flights.originCountry",
      "Origin country must be a 2-letter country code (e.g., NP)"
    );
  }

  // Step 14: Validate 'destination' airport code
  if (
    !validators.isString(flights.destination) ||
    !validators.isNotEmpty(flights.destination)
  ) {
    result.addError("flights.destination", "Destination is required");
  } else if (!validators.hasLength(flights.destination, 3)) {
    result.addError(
      "flights.destination",
      "Destination must be a 3-letter airport code (e.g., SYD)"
    );
  }

  // Step 15: Validate 'destinationCountry' code
  if (
    !validators.isString(flights.destinationCountry) ||
    !validators.isNotEmpty(flights.destinationCountry)
  ) {
    result.addError(
      "flights.destinationCountry",
      "Destination country is required"
    );
  } else if (!validators.hasLength(flights.destinationCountry, 2)) {
    result.addError(
      "flights.destinationCountry",
      "Destination country must be a 2-letter country code (e.g., AU)"
    );
  }

  // Step 16: Validate 'airlineCode'
  if (
    !validators.isString(flights.airlineCode) ||
    !validators.isNotEmpty(flights.airlineCode)
  ) {
    result.addError("flights.airlineCode", "Airline code is required");
  } else if (!validators.hasLength(flights.airlineCode, 2)) {
    result.addError(
      "flights.airlineCode",
      "Airline code must be a 2-letter code (e.g., QF)"
    );
  }

  // Step 17: Validate 'flightNumber'
  if (
    !validators.isString(flights.flightNumber) ||
    !validators.isNotEmpty(flights.flightNumber)
  ) {
    result.addError("flights.flightNumber", "Flight number is required");
  }

  // Step 18: If validation passed, set the validated data
  if (result.isValid()) {
    result.setData({
      header: {
        adults: header.adults,
        children: header.children,
        infants: header.infants,
        currency: header.currency,
        nationality: header.nationality,
      },
      flights: {
        departureTime: flights.departureTime,
        origin: flights.origin,
        originCountry: flights.originCountry,
        destination: flights.destination,
        destinationCountry: flights.destinationCountry,
        airlineCode: flights.airlineCode,
        flightNumber: flights.flightNumber,
      },
    });
  }

  // Step 19: Return the final validation result
  return result;
}
