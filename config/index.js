const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'https://eventful-moments.herokuapp.com/api/v1' : 'https://eventful-moments.herokuapp.com/api/v1'
