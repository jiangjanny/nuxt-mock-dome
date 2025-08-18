// 自訂驗證方法
export function required(value: string, msg = '此欄位必填') {
    if (!value || value.trim() === '') {
        return msg
    }
    return true
}

export function idNumber(value: string) {
    const regex = /^[A-Z][12]\d{8}$/
    if (!regex.test(value)) {
        return '身分證格式錯誤'
    }
    return true
}

export function phoneNumber(value: string) {
    const regex = /^09\d{8}$/
    if (!regex.test(value)) {
        return '手機格式錯誤'
    }
    return true
}
