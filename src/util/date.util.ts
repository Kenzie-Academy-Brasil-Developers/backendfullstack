import Users from "../entities/users.entity"

export const formatDate = ( date:string | number ) => {
    
    const currentDate = (new Date(date)).toLocaleString('pt-BR')

    return currentDate
} 

export const messageWelcome = ( user:Users ) => {

    const milecondsDate = Date.parse(Date()) - 10800000

    const currentDate =  formatDate(milecondsDate)
    const hourCurrentDate = (new Date( currentDate )).getHours()
    
    if(  hourCurrentDate >= 18 || hourCurrentDate < 6 ){
        return `Boa noite, ${user?.fullName}`
    }
    if(  hourCurrentDate >= 6 && hourCurrentDate < 12 ){
        return `Bom dia, ${user?.fullName}`
    }

    return `Boa tarde, ${user?.fullName}`
}

export const formatDateTimeZoneBr = ( date:string | number ) => {

    const newDate = new Date(date)
    const milecondsDate = Date.parse(`${newDate}`) - 10800000

    const resDate = formatDate( milecondsDate )

    return resDate
}