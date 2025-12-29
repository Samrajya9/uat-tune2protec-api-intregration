export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationResult<T = any> {
  private errors: ValidationError[] = [];
  private validatedData: T | null = null;

  addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  setData(data: T): void {
    this.validatedData = data;
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  getErrorMessages(): string[] {
    return this.errors.map((e) => `${e.field}: ${e.message}`);
  }

  getData(): T {
    if (!this.isValid()) {
      throw new Error("Cannot get data from invalid validation result");
    }
    return this.validatedData as T;
  }

  get data(): T {
    return this.getData();
  }
}

export const validators = {
  isString(value: any): boolean {
    return typeof value === "string";
  },

  isNumber(value: any): boolean {
    return typeof value === "number" && !isNaN(value);
  },

  isNotEmpty(value: any): boolean {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  hasLength(value: string, length: number): boolean {
    return !!value && value.length === length;
  },

  minValue(value: number, min: number): boolean {
    return value >= min;
  },

  isDateString(value: string): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  },

  isFutureDate(value: string): boolean {
    const date = new Date(value);
    return date > new Date();
  },
};
