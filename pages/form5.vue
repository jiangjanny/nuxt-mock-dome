<template>
  <div>
    <!-- 被保險人車主 -->
    <h2>被保險人車主資料</h2>
    <input v-model="insured.insuredNo" placeholder="身分證字號" />
    <input v-model="insured.insuredName" placeholder="姓名" />
    <select v-model="insured.insuredBirthday.year">
      <option v-for="y in years" :key="y">{{ y }}</option>
    </select>
    <select v-model="insured.insuredBirthday.month">
      <option v-for="m in months" :key="m">{{ m }}</option>
    </select>
    <select v-model="insured.insuredBirthday.day">
      <option v-for="d in days" :key="d">{{ d }}</option>
    </select>
    <input v-model="insured.insuredMobile" placeholder="手機號碼" />
    <input v-model="insured.insuredNation" placeholder="國家" />
    <input v-model="insured.insuredJobKind" placeholder="職業" />
    <input v-model="insured.insuredEmail" placeholder="電子信箱" />
    <input v-model="insured.insuredAddress.city" placeholder="城市" />
    <input v-model="insured.insuredAddress.area" placeholder="地區" />
    <input v-model="insured.insuredAddress.detail" placeholder="地址" />

    <!-- 要保人 -->
    <h2>要保人資料</h2>
    <select v-model="status.value">
      <option value="0">Status 0</option>
      <option value="1">Status 1</option>
      <option value="2">Status 2</option>
    </select>

    <!-- Status 0 / 1 -->
    <div v-if="status.value === '0' || status.value === '1'">
      <input v-model="applicant.applicantidNo" placeholder="身分證字號" />
      <input v-if="status.value === '1'" v-model="applicant.applicantRepRela" placeholder="關係" />
      <input v-model="applicant.applicantName" placeholder="姓名" />
      <select v-model="applicant.applicantBirthdav.year">
        <option v-for="y in years" :key="y">{{ y }}</option>
      </select>
      <select v-model="applicant.applicantBirthdav.month">
        <option v-for="m in months" :key="m">{{ m }}</option>
      </select>
      <select v-model="applicant.applicantBirthdav.day">
        <option v-for="d in days" :key="d">{{ d }}</option>
      </select>
      <input v-model="applicant.applicantMobile" placeholder="手機號碼" />
      <input v-model="applicant.applicantNatural" placeholder="國家" />
      <input v-model="applicant.applicantJobKind" placeholder="職業" />
      <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
      <input v-model="applicant.applicantAddress.city" placeholder="城市" />
      <input v-model="applicant.applicantAddress.area" placeholder="地區" />
      <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
    </div>

    <!-- Status 2 -->
    <div v-if="status.value === '2'">
      <label>要保人身分別</label>
      <input type="checkbox" v-model="applicant.applicantIsNatural" />

      <input v-model="applicant.applicantRepRela" readonly placeholder="關係 (雇傭)" />

      <input v-model="applicant.applicantidNo" placeholder="身分證字號"
        :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
      <input v-model="applicant.applicantName" placeholder="姓名"
        :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
      <input v-model="applicant.applicantMobile" placeholder="手機號碼"
        :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />

      <template v-if="applicant.applicantIsNatural">
        <select v-model="applicant.applicantBirthdav.year">
          <option v-for="y in years" :key="y">{{ y }}</option>
        </select>
        <select v-model="applicant.applicantBirthdav.month">
          <option v-for="m in months" :key="m">{{ m }}</option>
        </select>
        <select v-model="applicant.applicantBirthdav.day">
          <option v-for="d in days" :key="d">{{ d }}</option>
        </select>
        <input v-model="applicant.applicantNatural" placeholder="國家" />
        <input v-model="applicant.applicantJobKind" placeholder="職業" />
        <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
        <input v-model="applicant.applicantAddress.city" placeholder="城市" />
        <input v-model="applicant.applicantAddress.area" placeholder="地區" />
        <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
      </template>

      <template v-else>
        <input v-model="applicant.applicantMobile" placeholder="手機號碼" />
        <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
        <input v-model="applicant.applicantAddress.city" placeholder="城市" />
        <input v-model="applicant.applicantAddress.area" placeholder="地區" />
        <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
      </template>
    </div>

    <button @click="submitAll">送出</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue'
import { z } from 'zod'

const years = Array.from({ length: 100 }, (_, i) => 1925 + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)

const status = reactive({ value: '0' })

const insured = reactive({
  insuredNo: '', insuredName: '', insuredBirthday: { year: '', month: '', day: '' }, insuredMobile: '',
  insuredNation: '', insuredJobKind: '', insuredEmail: '',
  insuredAddress: { city: '', area: '', detail: '' }
})

const applicant = reactive({
  applicantIsNatural: true, applicantRepRela: '', lockApplicantCheckBox: true,
  applicantidNo: '', applicantName: '', applicantBirthdav: { year: '', month: '', day: '' }, applicantMobile: '',
  applicantNatural: '', applicantJobKind: '', applicantEmail: '',
  applicantAddress: { city: '', area: '', detail: '' }
})

// 解析出生年月日字串為物件
function parseBirthday(birthday: string) {
  if (!birthday) return { year: '', month: '', day: '' }
  const [year, month, day] = birthday.split('-')
  return { year, month, day }
}

// 格式化物件為字串
function formatBirthday(birth: { year: string, month: string, day: string }) {
  if (!birth.year || !birth.month || !birth.day) return ''
  return `${birth.year}-${birth.month.padStart(2, '0')}-${birth.day.padStart(2, '0')}`
}

// initAPI 模擬
async function initAPI() {
  Object.assign(insured, {
    insuredNo: 'Paaa',
    insuredName: '張三',
    insuredBirthday: parseBirthday('1990-06-15'),
    insuredMobile: '0912345678',
    insuredNation: 'TW',
    insuredJobKind: '工程師',
    insuredEmail: 'aaa@test.com',
    insuredAddress: { city: '台北市', area: '信義區', detail: '信義路100號' }
  })

  // 模擬 API 回傳 Y/N -> 轉 Boolean
  const initApplicantIsNatural = 'Y'
  Object.assign(applicant, {
    applicantIsNatural: initApplicantIsNatural === 'Y',
    applicantRepRela: '',
    applicantidNo: '',
    lockApplicantCheckBox: true,
    applicantName: '',
    applicantBirthdav: parseBirthday('1990-06-15'),
    applicantMobile: '',
    applicantNatural: '',
    applicantJobKind: '',
    applicantEmail: '',
    applicantAddress: { city: '', area: '', detail: '' }
  })
}

// Status 0 自動同步
watch([() => status.value, () => insured], () => {
  if (status.value === '0') {
    Object.assign(applicant, {
      applicantidNo: insured.insuredNo,
      applicantName: insured.insuredName,
      applicantBirthdav: { ...insured.insuredBirthday },
      applicantMobile: insured.insuredMobile,
      applicantNatural: insured.insuredNation,
      applicantJobKind: insured.insuredJobKind,
      applicantEmail: insured.insuredEmail,
      applicantAddress: { ...insured.insuredAddress },
      applicantRepRela: ''
    })
  }
})

// Status 2 lockApplicantCheckBox 自動同步
watch([() => status.value, () => insured], () => {
  if (status.value === '2' && applicant.lockApplicantCheckBox) {
    applicant.applicantIsNatural = true
    applicant.applicantidNo = insured.insuredNo
    applicant.applicantName = insured.insuredName
    applicant.applicantMobile = insured.insuredMobile
  }
})

// Zod schema
const insuredSchema = z.object({
  insuredNo: z.string().min(1, '必填'),
  insuredName: z.string().min(1, '必填'),
  insuredBirthday: z.object({ year: z.string().min(1), month: z.string().min(1), day: z.string().min(1) }),
  insuredMobile: z.string().min(1, '必填'),
  insuredNation: z.string().optional(),
  insuredJobKind: z.string().optional(),
  insuredEmail: z.string().email('格式錯誤'),
  insuredAddress: z.object({ city: z.string().optional(), area: z.string().optional(), detail: z.string().optional() })
})

const applicantSchema = z.object({
  applicantidNo: z.string().min(1, '必填'),
  applicantName: z.string().min(1, '必填').optional(),
  applicantBirthdav: z.object({ year: z.string().optional(), month: z.string().optional(), day: z.string().optional() }),
  applicantMobile: z.string().min(1, '必填'),
  applicantNatural: z.string().optional(),
  applicantJobKind: z.string().optional(),
  applicantEmail: z.string().email('格式錯誤'),
  applicantAddress: z.object({ city: z.string().optional(), area: z.string().optional(), detail: z.string().optional() }),
  applicantRepRela: z.string().optional()
})

// Boolean -> Y/N
function getApplicantIsNaturalValue() {
  return applicant.applicantIsNatural ? 'Y' : 'N'
}

function submitAll() {
  const insuredResult = insuredSchema.safeParse(insured)
  const applicantResult = applicantSchema.safeParse(applicant)

  if (insuredResult.success && applicantResult.success) {
    console.log('驗證通過', {
      insured: { ...insured, insuredBirthday: formatBirthday(insured.insuredBirthday) },
      applicant: {
        ...applicant,
        applicantBirthdav: formatBirthday(applicant.applicantBirthdav),
        applicantIsNatural: getApplicantIsNaturalValue()
      }
    })
  } else {
    console.log('驗證錯誤', {
      insuredErrors: insuredResult.success ? null : insuredResult.error.format(),
      applicantErrors: applicantResult.success ? null : applicantResult.error.format()
    })
  }
}

onMounted(() => {
  initAPI()
})
</script>
