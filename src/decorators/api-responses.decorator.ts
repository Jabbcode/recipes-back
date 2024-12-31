import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

interface ApiResponseOptions {
  status: number
  description: string
}

export function ApiResponses(responses: ApiResponseOptions[]) {
  return applyDecorators(
    ...responses.map((response) =>
      ApiResponse({
        status: response.status,
        description: response.description,
      }),
    ),
  )
}
