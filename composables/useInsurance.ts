import { reactive, ref } from 'vue'

export const insured = reactive({
    insuredNo: '',
    insuredName: '',
    insuredBirthday: { year: '', month: '', day: '' },
    insuredMobile: '',
    insuredNation: '',
    insuredJobKind: '',
    insuredEmail: '',
    insured: null,
    insuredAddress: { city: '', area: '', detail: '' },
})

export const applicant = reactive({
    applicantIsNatural: true,
    lockApplicantCheckBox: true,
    applicantRepRela: '',
    applicantidNo: '',
    applicantName: '',
    applicantBirthdav: { year: '', month: '', day: '' },
    applicantMobile: '',
    applicantEmail: '',
    applicantNatural: '',
    applicantJobKind: '',
    applicantAddress: { city: '', area: '', detail: '' }
})

export const years = Array.from({ length: 100 }, (_, i) => `${2000 - i}`)
export const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`)
export const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`)

export const statusww = ref(2)
export const active = ref(false)


// 備份 applicant 資料，用於 Status 2 回復
export const backupApplicant = reactive({ ...applicant })


// 狀態
export const status = reactive({ value: '0' })