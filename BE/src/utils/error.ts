import { GraphQLError } from 'graphql';
import { GRAPHQL_CODE_ERROR } from './const';

export class MyCustomException extends GraphQLError {
  constructor(
    message: string,
    private readonly code: string = GRAPHQL_CODE_ERROR.BadRequest,
  ) {
    super(message, {
      extensions: {
        code: code,
      },
    });
  }
}

export class MyUnAuthorizedException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.UnAuthorizedError);
  }
}

export class MyBadRequestException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.BadRequest);
  }
}

export class MyNotFoundException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.NotFound);
  }
}

export class MyDBException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.DBError);
  }
}

export class MyForbiddenException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.ForbiddenError);
  }
}

export class MyInternalServerException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.InternalServerError);
  }
}
