import Users from "../entities/users.entity"

export const messageWelcome = ( user:Users ) => {

    const milecondsDate = Date.parse(Date()) - 10800000

    const currentDate = (new Date(milecondsDate)).toLocaleString('pt-BR', { timeZone: 'UTC', timeZoneName: 'short' })
    const hourCurrentDate = (new Date( currentDate )).getHours()
    
    if(  hourCurrentDate >= 18 || hourCurrentDate < 6 ){
        return `Boa noite, ${user?.fullName}`
    }
    if(  hourCurrentDate >= 6 && hourCurrentDate < 12 ){
        return `Bom dia, ${user?.fullName}`
    }

    return `Boa tarde, ${user?.fullName}`
}