import { reactive } from 'vue'

export const insured = reactive({
    insuredNo: '',
    insuredName: '',
    insuredBirthday: { year: '', month: '', day: '' },
    insuredMobile: '',
    insuredNation: '',
    insuredJobKind: '',
    insuredEmail: '',
    insuredAddress: { city: '', area: '', detail: '' }
})

export const applicant = reactive({
    applicantIsNatural: true,
    lockApplicantCheckBox: true,
    applicantRepRela: '',
    applicantidNo: '',
    applicantName: '',
    applicantBirthdav: { year: '', month: '', day: '' },
    applicantMobile: '',
    applicantNatural: '',
    applicantJobKind: '',
    applicantEmail: '',
    applicantAddress: { city: '', area: '', detail: '' }
})

// 備份 applicant 資料，用於 Status 2 回復
export const backupApplicant = reactive({ ...applicant })

// 年/月/日資料
export const years = Array.from({ length: 100 }, (_, i) => 1925 + i)
export const months = Array.from({ length: 12 }, (_, i) => i + 1)
export const days = Array.from({ length: 31 }, (_, i) => i + 1)

// 狀態
export const status = reactive({ value: '0' })
