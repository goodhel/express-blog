import { Response } from "express"

interface Data {
    status: boolean
    data?: any
    error?: any
    code?: number
}

class _Response {
    sendResponse = (res: Response, data: Data) => {
        try {
            if (data.code) {
                res.status(data.code)

                delete data.code

                res.send(data)
                return true
            }

            res.status(data && data.status ? 200 : 400)
            res.send(data)
            return true
        } catch (error) {
            console.error('sendResponse response helper Error: ', error)

            res.status(400).send({
                status: false,
                error
            })
            
            return false
        }
    }
}

export default new _Response()