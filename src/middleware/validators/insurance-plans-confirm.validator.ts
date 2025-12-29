import type { InsurancePlansConfirmRequest } from "../../types/insurance-plans-confirm.js";
import { ValidationResult, validators } from "../../utils/validation.js";

/**
 * Validates the Insurance Plans Confirm Request body.
 * @param body - The request body to validate.
 * @returns A ValidationResult containing any errors found and validated data.
 */
export function validateInsurancePlansConfirmRequest(
  body: any
): ValidationResult<InsurancePlansConfirmRequest> {
  // Step 1: Initialize the validation result object
  const result = new ValidationResult<InsurancePlansConfirmRequest>();

  // Step 2: Check if the request body itself is provided and is an object
  if (!body || typeof body !== "object") {
    result.addError("body", "Request body is required");
    return result;
  }

  // Step 3: Validate that the 'Header' property exists and is an object
  if (!body.Header || typeof body.Header !== "object") {
    result.addError("Header", "Header object is required");
    return result;
  }

  // Step 4: Validate that the 'ContactDetails' property exists and is an object
  if (!body.ContactDetails || typeof body.ContactDetails !== "object") {
    result.addError("ContactDetails", "ContactDetails object is required");
    return result;
  }

  // Step 5: Validate that the 'Flights' property exists and is an object
  if (!body.Flights || typeof body.Flights !== "object") {
    result.addError("Flights", "Flights object is required");
    return result;
  }

  // Step 6: Validate that the 'Passengers' property exists and is an array
  if (!Array.isArray(body.Passengers)) {
    result.addError("Passengers", "Passengers must be an array");
    return result;
  }

  if (body.Passengers.length === 0) {
    result.addError("Passengers", "At least one passenger is required");
    return result;
  }

  // Step 7: Destructure for easier access
  const { Header, ContactDetails, Flights, Passengers } = body;

  // --- Validate Header Fields ---

  // Step 8: Validate 'PNR'
  if (!validators.isString(Header.PNR) || !validators.isNotEmpty(Header.PNR)) {
    result.addError("Header.PNR", "PNR is required");
  }

  // Step 9: Validate 'PurchaseDate'
  if (
    !validators.isString(Header.PurchaseDate) ||
    !validators.isNotEmpty(Header.PurchaseDate)
  ) {
    result.addError("Header.PurchaseDate", "Purchase date is required");
  } else if (!validators.isDateString(Header.PurchaseDate)) {
    result.addError(
      "Header.PurchaseDate",
      "Purchase date must be a valid ISO 8601 date string"
    );
  }

  // Step 10: Validate 'SSRFeeCode'
  if (
    !validators.isString(Header.SSRFeeCode) ||
    !validators.isNotEmpty(Header.SSRFeeCode)
  ) {
    result.addError("Header.SSRFeeCode", "SSR fee code is required");
  }

  // Step 11: Validate 'Currency'
  if (
    !validators.isString(Header.Currency) ||
    !validators.isNotEmpty(Header.Currency)
  ) {
    result.addError("Header.Currency", "Currency is required");
  } else if (!validators.hasLength(Header.Currency, 3)) {
    result.addError(
      "Header.Currency",
      "Currency must be a 3-letter code (e.g., NPR, USD)"
    );
  }

  // Step 12: Validate 'TotalPremium'
  if (!validators.isNumber(Header.TotalPremium)) {
    result.addError("Header.TotalPremium", "Total premium must be a number");
  } else if (!validators.minValue(Header.TotalPremium, 0)) {
    result.addError("Header.TotalPremium", "Total premium cannot be negative");
  }

  // Step 13: Validate 'CountryCode'
  if (
    !validators.isString(Header.CountryCode) ||
    !validators.isNotEmpty(Header.CountryCode)
  ) {
    result.addError("Header.CountryCode", "Country code is required");
  } else if (!validators.hasLength(Header.CountryCode, 2)) {
    result.addError(
      "Header.CountryCode",
      "Country code must be a 2-letter code (e.g., NP, US)"
    );
  }

  // Step 14: Validate 'TotalAdults'
  if (!validators.isNumber(Header.TotalAdults)) {
    result.addError("Header.TotalAdults", "Total adults must be a number");
  } else if (!validators.minValue(Header.TotalAdults, 1)) {
    result.addError("Header.TotalAdults", "At least 1 adult is required");
  }

  // Step 15: Validate 'TotalChild'
  if (!validators.isNumber(Header.TotalChild)) {
    result.addError("Header.TotalChild", "Total child must be a number");
  } else if (!validators.minValue(Header.TotalChild, 0)) {
    result.addError("Header.TotalChild", "Total child cannot be negative");
  }

  // Step 16: Validate 'TotalInfants'
  if (!validators.isNumber(Header.TotalInfants)) {
    result.addError("Header.TotalInfants", "Total infants must be a number");
  } else if (!validators.minValue(Header.TotalInfants, 0)) {
    result.addError("Header.TotalInfants", "Total infants cannot be negative");
  }

  // --- Validate ContactDetails Fields ---

  // Step 17: Validate 'ContactPerson'
  if (
    !validators.isString(ContactDetails.ContactPerson) ||
    !validators.isNotEmpty(ContactDetails.ContactPerson)
  ) {
    result.addError(
      "ContactDetails.ContactPerson",
      "Contact person is required"
    );
  }

  // Step 18: Validate 'Address1'
  if (
    !validators.isString(ContactDetails.Address1) ||
    !validators.isNotEmpty(ContactDetails.Address1)
  ) {
    result.addError("ContactDetails.Address1", "Address1 is required");
  }

  // Step 19: Validate 'MobilePhoneNum'
  if (
    !validators.isString(ContactDetails.MobilePhoneNum) ||
    !validators.isNotEmpty(ContactDetails.MobilePhoneNum)
  ) {
    result.addError(
      "ContactDetails.MobilePhoneNum",
      "Mobile phone number is required"
    );
  }

  // Step 20: Validate 'PostCode'
  if (
    !validators.isString(ContactDetails.PostCode) ||
    !validators.isNotEmpty(ContactDetails.PostCode)
  ) {
    result.addError("ContactDetails.PostCode", "Post code is required");
  }

  // Step 21: Validate 'City'
  if (
    !validators.isString(ContactDetails.City) ||
    !validators.isNotEmpty(ContactDetails.City)
  ) {
    result.addError("ContactDetails.City", "City is required");
  }

  // Step 22: Validate 'State'
  if (
    !validators.isString(ContactDetails.State) ||
    !validators.isNotEmpty(ContactDetails.State)
  ) {
    result.addError("ContactDetails.State", "State is required");
  }

  // Step 23: Validate 'Country'
  if (
    !validators.isString(ContactDetails.Country) ||
    !validators.isNotEmpty(ContactDetails.Country)
  ) {
    result.addError("ContactDetails.Country", "Country is required");
  } else if (!validators.hasLength(ContactDetails.Country, 2)) {
    result.addError(
      "ContactDetails.Country",
      "Country must be a 2-letter code (e.g., NP, US)"
    );
  }

  // Step 24: Validate 'EmailAddress'
  if (
    !validators.isString(ContactDetails.EmailAddress) ||
    !validators.isNotEmpty(ContactDetails.EmailAddress)
  ) {
    result.addError("ContactDetails.EmailAddress", "Email address is required");
  } else if (!ContactDetails.EmailAddress.includes("@")) {
    result.addError(
      "ContactDetails.EmailAddress",
      "Email address must be valid"
    );
  }

  // --- Validate Flights Fields ---

  // Step 25: Validate 'DepartCountryCode'
  if (
    !validators.isString(Flights.DepartCountryCode) ||
    !validators.isNotEmpty(Flights.DepartCountryCode)
  ) {
    result.addError(
      "Flights.DepartCountryCode",
      "Departure country code is required"
    );
  } else if (!validators.hasLength(Flights.DepartCountryCode, 2)) {
    result.addError(
      "Flights.DepartCountryCode",
      "Departure country code must be a 2-letter code (e.g., NP)"
    );
  }

  // Step 26: Validate 'DepartStationCode'
  if (
    !validators.isString(Flights.DepartStationCode) ||
    !validators.isNotEmpty(Flights.DepartStationCode)
  ) {
    result.addError(
      "Flights.DepartStationCode",
      "Departure station code is required"
    );
  } else if (!validators.hasLength(Flights.DepartStationCode, 3)) {
    result.addError(
      "Flights.DepartStationCode",
      "Departure station code must be a 3-letter airport code (e.g., KTM)"
    );
  }

  // Step 27: Validate 'ArrivalCountryCode'
  if (
    !validators.isString(Flights.ArrivalCountryCode) ||
    !validators.isNotEmpty(Flights.ArrivalCountryCode)
  ) {
    result.addError(
      "Flights.ArrivalCountryCode",
      "Arrival country code is required"
    );
  } else if (!validators.hasLength(Flights.ArrivalCountryCode, 2)) {
    result.addError(
      "Flights.ArrivalCountryCode",
      "Arrival country code must be a 2-letter code (e.g., AU)"
    );
  }

  // Step 28: Validate 'ArrivalStationCode'
  if (
    !validators.isString(Flights.ArrivalStationCode) ||
    !validators.isNotEmpty(Flights.ArrivalStationCode)
  ) {
    result.addError(
      "Flights.ArrivalStationCode",
      "Arrival station code is required"
    );
  } else if (!validators.hasLength(Flights.ArrivalStationCode, 3)) {
    result.addError(
      "Flights.ArrivalStationCode",
      "Arrival station code must be a 3-letter airport code (e.g., SYD)"
    );
  }

  // Step 29: Validate 'DepartAirlineCode'
  if (
    !validators.isString(Flights.DepartAirlineCode) ||
    !validators.isNotEmpty(Flights.DepartAirlineCode)
  ) {
    result.addError(
      "Flights.DepartAirlineCode",
      "Departure airline code is required"
    );
  } else if (!validators.hasLength(Flights.DepartAirlineCode, 2)) {
    result.addError(
      "Flights.DepartAirlineCode",
      "Departure airline code must be a 2-letter code (e.g., QF)"
    );
  }

  // Step 30: Validate 'DepartDateTime'
  if (
    !validators.isString(Flights.DepartDateTime) ||
    !validators.isNotEmpty(Flights.DepartDateTime)
  ) {
    result.addError(
      "Flights.DepartDateTime",
      "Departure date time is required"
    );
  } else if (!validators.isDateString(Flights.DepartDateTime)) {
    result.addError(
      "Flights.DepartDateTime",
      "Departure date time must be a valid ISO 8601 date string"
    );
  }

  // Step 31: Validate 'DepartFlightNo'
  if (
    !validators.isString(Flights.DepartFlightNo) ||
    !validators.isNotEmpty(Flights.DepartFlightNo)
  ) {
    result.addError(
      "Flights.DepartFlightNo",
      "Departure flight number is required"
    );
  }

  // Step 32: Validate optional return flight fields if provided
  if (
    Flights.ReturnAirlineCode !== undefined &&
    Flights.ReturnAirlineCode !== null
  ) {
    if (
      !validators.isString(Flights.ReturnAirlineCode) ||
      !validators.isNotEmpty(Flights.ReturnAirlineCode)
    ) {
      result.addError(
        "Flights.ReturnAirlineCode",
        "Return airline code must be a valid string if provided"
      );
    } else if (!validators.hasLength(Flights.ReturnAirlineCode, 2)) {
      result.addError(
        "Flights.ReturnAirlineCode",
        "Return airline code must be a 2-letter code (e.g., QF)"
      );
    }
  }

  if (Flights.ReturnDateTime !== undefined && Flights.ReturnDateTime !== null) {
    if (
      !validators.isString(Flights.ReturnDateTime) ||
      !validators.isNotEmpty(Flights.ReturnDateTime)
    ) {
      result.addError(
        "Flights.ReturnDateTime",
        "Return date time must be a valid string if provided"
      );
    } else if (!validators.isDateString(Flights.ReturnDateTime)) {
      result.addError(
        "Flights.ReturnDateTime",
        "Return date time must be a valid ISO 8601 date string"
      );
    }
  }

  if (Flights.ReturnFlightNo !== undefined && Flights.ReturnFlightNo !== null) {
    if (
      !validators.isString(Flights.ReturnFlightNo) ||
      !validators.isNotEmpty(Flights.ReturnFlightNo)
    ) {
      result.addError(
        "Flights.ReturnFlightNo",
        "Return flight number must be a valid string if provided"
      );
    }
  }

  // --- Validate Passengers Array ---

  // Step 33: Validate each passenger
  Passengers.forEach((passenger: any, index: number) => {
    const prefix = `Passengers[${index}]`;

    // Validate 'IsInfant'
    if (
      !validators.isString(passenger.IsInfant) ||
      !validators.isNotEmpty(passenger.IsInfant)
    ) {
      result.addError(`${prefix}.IsInfant`, "IsInfant is required");
    } else if (
      passenger.IsInfant !== "true" &&
      passenger.IsInfant !== "false"
    ) {
      result.addError(
        `${prefix}.IsInfant`,
        "IsInfant must be 'true' or 'false'"
      );
    }

    // Validate 'FirstName'
    if (
      !validators.isString(passenger.FirstName) ||
      !validators.isNotEmpty(passenger.FirstName)
    ) {
      result.addError(`${prefix}.FirstName`, "First name is required");
    }

    // Validate 'LastName'
    if (
      !validators.isString(passenger.LastName) ||
      !validators.isNotEmpty(passenger.LastName)
    ) {
      result.addError(`${prefix}.LastName`, "Last name is required");
    }

    // Validate 'Gender'
    if (!validators.isNumber(passenger.Gender)) {
      result.addError(`${prefix}.Gender`, "Gender must be a number");
    } else if (passenger.Gender !== 1 && passenger.Gender !== 2) {
      result.addError(
        `${prefix}.Gender`,
        "Gender must be 1 (Male) or 2 (Female)"
      );
    }

    // Validate 'DOB'
    if (
      !validators.isString(passenger.DOB) ||
      !validators.isNotEmpty(passenger.DOB)
    ) {
      result.addError(`${prefix}.DOB`, "Date of birth is required");
    } else if (!validators.isDateString(passenger.DOB)) {
      result.addError(
        `${prefix}.DOB`,
        "Date of birth must be a valid date string (YYYY-MM-DD)"
      );
    }

    // Validate 'Age'
    if (
      !validators.isString(passenger.Age) ||
      !validators.isNotEmpty(passenger.Age)
    ) {
      result.addError(`${prefix}.Age`, "Age is required");
    }

    // Validate 'IdentityType'
    if (!validators.isNumber(passenger.IdentityType)) {
      result.addError(
        `${prefix}.IdentityType`,
        "Identity type must be a number"
      );
    }

    // Validate 'IdentityNo'
    if (
      !validators.isString(passenger.IdentityNo) ||
      !validators.isNotEmpty(passenger.IdentityNo)
    ) {
      result.addError(`${prefix}.IdentityNo`, "Identity number is required");
    }

    // Validate 'Nationality'
    if (
      !validators.isString(passenger.Nationality) ||
      !validators.isNotEmpty(passenger.Nationality)
    ) {
      result.addError(`${prefix}.Nationality`, "Nationality is required");
    } else if (!validators.hasLength(passenger.Nationality, 2)) {
      result.addError(
        `${prefix}.Nationality`,
        "Nationality must be a 2-letter country code (e.g., NP)"
      );
    }

    // Validate 'CountryOfResidence'
    if (
      !validators.isString(passenger.CountryOfResidence) ||
      !validators.isNotEmpty(passenger.CountryOfResidence)
    ) {
      result.addError(
        `${prefix}.CountryOfResidence`,
        "Country of residence is required"
      );
    } else if (!validators.hasLength(passenger.CountryOfResidence, 2)) {
      result.addError(
        `${prefix}.CountryOfResidence`,
        "Country of residence must be a 2-letter country code (e.g., NP)"
      );
    }

    // Validate 'SelectedPlanCode'
    if (
      !validators.isString(passenger.SelectedPlanCode) ||
      !validators.isNotEmpty(passenger.SelectedPlanCode)
    ) {
      result.addError(
        `${prefix}.SelectedPlanCode`,
        "Selected plan code is required"
      );
    }

    // Validate 'SelectedSSRFeeCode'
    if (
      !validators.isString(passenger.SelectedSSRFeeCode) ||
      !validators.isNotEmpty(passenger.SelectedSSRFeeCode)
    ) {
      result.addError(
        `${prefix}.SelectedSSRFeeCode`,
        "Selected SSR fee code is required"
      );
    }

    // Validate 'CurrencyCode'
    if (
      !validators.isString(passenger.CurrencyCode) ||
      !validators.isNotEmpty(passenger.CurrencyCode)
    ) {
      result.addError(`${prefix}.CurrencyCode`, "Currency code is required");
    } else if (!validators.hasLength(passenger.CurrencyCode, 3)) {
      result.addError(
        `${prefix}.CurrencyCode`,
        "Currency code must be a 3-letter code (e.g., NPR)"
      );
    }

    // Validate 'PassengerPremiumAmount'
    if (!validators.isNumber(passenger.PassengerPremiumAmount)) {
      result.addError(
        `${prefix}.PassengerPremiumAmount`,
        "Passenger premium amount must be a number"
      );
    } else if (!validators.minValue(passenger.PassengerPremiumAmount, 0)) {
      result.addError(
        `${prefix}.PassengerPremiumAmount`,
        "Passenger premium amount cannot be negative"
      );
    }

    // Validate 'EmailAddress'
    if (
      !validators.isString(passenger.EmailAddress) ||
      !validators.isNotEmpty(passenger.EmailAddress)
    ) {
      result.addError(`${prefix}.EmailAddress`, "Email address is required");
    } else if (!passenger.EmailAddress.includes("@")) {
      result.addError(`${prefix}.EmailAddress`, "Email address must be valid");
    }

    // Validate 'PhoneNumber'
    if (
      !validators.isString(passenger.PhoneNumber) ||
      !validators.isNotEmpty(passenger.PhoneNumber)
    ) {
      result.addError(`${prefix}.PhoneNumber`, "Phone number is required");
    }

    // Validate 'Address'
    if (
      !validators.isString(passenger.Address) ||
      !validators.isNotEmpty(passenger.Address)
    ) {
      result.addError(`${prefix}.Address`, "Address is required");
    }

    // Validate 'ExtraInfo' if provided
    if (passenger.ExtraInfo !== undefined && passenger.ExtraInfo !== null) {
      if (!Array.isArray(passenger.ExtraInfo)) {
        result.addError(
          `${prefix}.ExtraInfo`,
          "ExtraInfo must be an array if provided"
        );
      } else {
        passenger.ExtraInfo.forEach((extra: any, extraIndex: number) => {
          const extraPrefix = `${prefix}.ExtraInfo[${extraIndex}]`;

          if (!validators.isNumber(extra.ItemID)) {
            result.addError(`${extraPrefix}.ItemID`, "ItemID must be a number");
          }

          if (
            !validators.isString(extra.ItemKeyName) ||
            !validators.isNotEmpty(extra.ItemKeyName)
          ) {
            result.addError(
              `${extraPrefix}.ItemKeyName`,
              "ItemKeyName is required"
            );
          }

          if (
            !validators.isString(extra.ItemDesc) ||
            !validators.isNotEmpty(extra.ItemDesc)
          ) {
            result.addError(`${extraPrefix}.ItemDesc`, "ItemDesc is required");
          }
        });
      }
    }
  });

  // Step 34: If validation passed, set the validated data
  if (result.isValid()) {
    result.setData({
      Header: {
        PNR: Header.PNR,
        PurchaseDate: Header.PurchaseDate,
        SSRFeeCode: Header.SSRFeeCode,
        Currency: Header.Currency,
        TotalPremium: Header.TotalPremium,
        CountryCode: Header.CountryCode,
        TotalAdults: Header.TotalAdults,
        TotalChild: Header.TotalChild,
        TotalInfants: Header.TotalInfants,
      },
      ContactDetails: {
        ContactPerson: ContactDetails.ContactPerson,
        Address1: ContactDetails.Address1,
        Address2: ContactDetails.Address2,
        Address3: ContactDetails.Address3,
        MobilePhoneNum: ContactDetails.MobilePhoneNum,
        HomePhoneNum: ContactDetails.HomePhoneNum,
        OtherPhoneNum: ContactDetails.OtherPhoneNum,
        PostCode: ContactDetails.PostCode,
        City: ContactDetails.City,
        State: ContactDetails.State,
        Country: ContactDetails.Country,
        EmailAddress: ContactDetails.EmailAddress,
      },
      Flights: {
        DepartCountryCode: Flights.DepartCountryCode,
        DepartStationCode: Flights.DepartStationCode,
        ArrivalCountryCode: Flights.ArrivalCountryCode,
        ArrivalStationCode: Flights.ArrivalStationCode,
        DepartAirlineCode: Flights.DepartAirlineCode,
        DepartDateTime: Flights.DepartDateTime,
        DepartFlightNo: Flights.DepartFlightNo,
        ReturnAirlineCode: Flights.ReturnAirlineCode,
        ReturnDateTime: Flights.ReturnDateTime,
        ReturnFlightNo: Flights.ReturnFlightNo,
      },
      Passengers: Passengers.map((passenger: any) => ({
        IsInfant: passenger.IsInfant,
        FirstName: passenger.FirstName,
        LastName: passenger.LastName,
        Gender: passenger.Gender,
        DOB: passenger.DOB,
        Age: passenger.Age,
        IdentityType: passenger.IdentityType,
        IdentityNo: passenger.IdentityNo,
        IsQualified: passenger.IsQualified,
        Nationality: passenger.Nationality,
        CountryOfResidence: passenger.CountryOfResidence,
        SelectedPlanCode: passenger.SelectedPlanCode,
        SelectedSSRFeeCode: passenger.SelectedSSRFeeCode,
        CurrencyCode: passenger.CurrencyCode,
        PassengerPremiumAmount: passenger.PassengerPremiumAmount,
        EmailAddress: passenger.EmailAddress,
        PhoneNumber: passenger.PhoneNumber,
        Address: passenger.Address,
        ExtraInfo: passenger.ExtraInfo,
      })),
    });
  }

  // Step 35: Return the final validation result
  return result;
}
