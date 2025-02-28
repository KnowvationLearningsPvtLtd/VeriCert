// import jwt from 'jsonwebtoken';
// import config from '../config/config';

// export const generateAccessToken = (user: any) => {
//     return jwt.sign({
//         id: user._id,
//         role: user.role,
//     }, config.JWT_SECRET ,{
//         expiresIn: '15m'
//     })
// }


// export const generateRefreshToken = (user: any) => {
//     return jwt.sign({
//         id: user._id
//     }, config.RESFRESH_SECRET, {
//         expiresIn: '7d'
//     })
// }


// export const verifyToken = (token: string) => {
//     return jwt.verify(token, config.RESFRESH_SECRET)
// }