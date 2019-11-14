import { RequiredParameterError } from './errors'

//Factory function that throw new error if the param has met error condition
export default function requiredParam(param){
    throw new RequiredParameterError(param)
}