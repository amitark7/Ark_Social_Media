import * as AuthApi from '../api/AuthRequest'

export const logIn=(formData)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.LogIn(formData)
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const SignUp =(formData)=>async (dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.SignUp(formData)
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const logout=()=>async (dispatch)=>{
    dispatch({type:"LOG_OUT"})
}