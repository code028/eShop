const throwErrorHandler = (status: number, message: string) => {
    throw {
        status,
        message
    }
}
  
export default throwErrorHandler