import { required, idNumber, phoneNumber } from '../utils/validators'

export function useFormSchema(status: number, insuredIdentity?: boolean) {
    switch (status) {
        case 0:
            return [
                { name: 'name', label: '名稱', rules: [required] },
                { name: 'relation', label: '關係', rules: [required] },
                { name: 'idNumber', label: '身分證', rules: [required, idNumber] }
            ]
        case 1:
            return [
                { name: 'consent', label: '同意保險人資料', rules: [required] },
                { name: 'idNumber', label: '身分證', rules: [required, idNumber] },
                { name: 'relation', label: '關係', rules: [required] },
                { name: 'name', label: '名稱', rules: [required] }
            ]
        case 2:
            if (insuredIdentity === false) {
                return [
                    { name: 'insuredIdentity', label: '要保人身分別', rules: [required] },
                    { name: 'relation', label: '關係', rules: [required] },
                    { name: 'idNumber', label: '身分證', rules: [required, idNumber] },
                    { name: 'phone', label: '手機', rules: [required, phoneNumber] }
                ]
            }
            return [
                { name: 'insuredIdentity', label: '要保人身分別', rules: [required] },
                { name: 'relation', label: '關係', rules: [required] },
                { name: 'idNumber', label: '身分證', rules: [required, idNumber] },
                { name: 'birth', label: '出生年月日', rules: [required] }
            ]
        default:
            return []
    }
}
