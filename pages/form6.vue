<template>
  <div>
    <!-- 被保險人車主 -->
    <h2>被保險人車主資料</h2>
    <input v-model="insured.insuredNo" placeholder="身分證字號" />
    <div class="error">{{ errors.insuredNo }}</div>

    <input v-model="insured.insuredName" placeholder="姓名" />
    <div class="error">{{ errors.insuredName }}</div>

    <select v-model="insured.insuredBirthday.year">
      <option value="">年</option>
      <option v-for="y in years" :key="y">{{ y }}</option>
    </select>
    <select v-model="insured.insuredBirthday.month">
      <option value="">月</option>
      <option v-for="m in months" :key="m">{{ m }}</option>
    </select>
    <select v-model="insured.insuredBirthday.day">
      <option value="">日</option>
      <option v-for="d in days" :key="d">{{ d }}</option>
    </select>
    <div class="error">{{ errors.insuredBirthday }}</div>

    <input v-model="insured.insuredMobile" placeholder="手機號碼" />
    <div class="error">{{ errors.insuredMobile }}</div>

    <input v-model="insured.insuredNation" placeholder="國家" />
    <input v-model="insured.insuredJobKind" placeholder="職業" />
    <input v-model="insured.insuredEmail" placeholder="電子信箱" />
    <div class="error">{{ errors.insuredEmail }}</div>

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
      <div class="error">{{ errors.applicantidNo }}</div>

      <input v-if="status.value === '1'" v-model="applicant.applicantRepRela" placeholder="關係" />

      <input v-model="applicant.applicantName" placeholder="姓名" />
      <div class="error">{{ errors.applicantName }}</div>

      <select v-model="applicant.applicantBirthdav.year">
        <option value="">年</option>
        <option v-for="y in years" :key="y">{{ y }}</option>
      </select>
      <select v-model="applicant.applicantBirthdav.month">
        <option value="">月</option>
        <option v-for="m in months" :key="m">{{ m }}</option>
      </select>
      <select v-model="applicant.applicantBirthdav.day">
        <option value="">日</option>
        <option v-for="d in days" :key="d">{{ d }}</option>
      </select>
      <div class="error">{{ errors.applicantBirthdav }}</div>

      <input v-model="applicant.applicantMobile" placeholder="手機號碼" />
      <div class="error">{{ errors.applicantMobile }}</div>

      <input v-model="applicant.applicantNatural" placeholder="國家" />
      <input v-model="applicant.applicantJobKind" placeholder="職業" />
      <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
      <div class="error">{{ errors.applicantEmail }}</div>

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
      <div class="error">{{ errors.applicantidNo }}</div>

      <input v-model="applicant.applicantName" placeholder="姓名"
        :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
      <div class="error">{{ errors.applicantName }}</div>

      <input v-model="applicant.applicantMobile" placeholder="手機號碼"
        :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
      <div class="error">{{ errors.applicantMobile }}</div>

      <template v-if="applicant.applicantIsNatural">
        <select v-model="applicant.applicantBirthdav.year">
          <option value="">年</option>
          <option v-for="y in years" :key="y">{{ y }}</option>
        </select>
        <select v-model="applicant.applicantBirthdav.month">
          <option value="">月</option>
          <option v-for="m in months" :key="m">{{ m }}</option>
        </select>
        <select v-model="applicant.applicantBirthdav.day">
          <option value="">日</option>
          <option v-for="d in days" :key="d">{{ d }}</option>
        </select>
        <div class="error">{{ errors.applicantBirthdav }}</div>

        <input v-model="applicant.applicantNatural" placeholder="國家" />
        <input v-model="applicant.applicantJobKind" placeholder="職業" />
        <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
        <div class="error">{{ errors.applicantEmail }}</div>

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

// 狀態、年/月/日
const status = reactive({ value: '0' })
const years = Array.from({ length: 100 }, (_, i) => 1925 + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)

// 被保險人
const insured = reactive({
  insuredNo: '', insuredName: '', insuredBirthday: { year: '', month: '', day: '' }, insuredMobile: '',
  insuredNation: '', insuredJobKind: '', insuredEmail: '',
  insuredAddress: { city: '', area: '', detail: '' }
})

// 要保人
const applicant = reactive({
  applicantIsNatural: true, applicantRepRela: '', lockApplicantCheckBox: true,
  applicantidNo: '', applicantName: '', applicantBirthdav: { year: '', month: '', day: '' }, applicantMobile: '',
  applicantNatural: '', applicantJobKind: '', applicantEmail: '',
  applicantAddress: { city: '', area: '', detail: '' }
})

// 暫存 applicant 資料
const backupApplicant = reactive({ ...applicant })

// parse / format
function parseBirthday(str: string) { if (!str) return { year: '', month: '', day: '' }; const [y, m, d] = str.split('-'); return { year: y, month: m, day: d } }
function formatBirthday(b: { year: string, month: string, day: string }) { if (!b.year || !b.month || !b.day) return ''; return `${b.year}-${b.month.padStart(2, '0')}-${b.day.padStart(2, '0')}` }

// 模擬 initAPI
// initAPI 模擬 

async function initAPI() {
  // 模擬 initAPI
  const ref = {
    status: 'Y',
    code: 200,
    data: {
      insured: {
        insuredNo: 'Paaa',
        insuredName: '張三',
        insuredBirthday: '1990-06-15',
        insuredMobile: '0912345678',
        insuredNation: 'TW',
        insuredJobKind: '工程師',
        insuredEmail: 'aaa@test.com',
        insuredAddress: { city: '台北市', area: '信義區', detail: '信義路100號' }
      },
      applicant: {
        applicantIsNatural: 'Y',
        applicantRepRela: '',
        applicantidNo: '',
        lockApplicantCheckBox: true,
        applicantName: '',
        applicantBirthdav: '',
        applicantMobile: '',
        applicantNatural: '',
        applicantJobKind: '',
        applicantEmail: '',
        applicantAddress: { city: '', area: '', detail: '' }
      }
    }
  }

  const insuredData = ref.data.insured
  const applicantData = ref.data.applicant

  Object.assign(insured, {
    insuredNo: insuredData.insuredNo,
    insuredName: insuredData.insuredName,
    insuredBirthday: parseBirthday(insuredData.insuredBirthday),
    insuredMobile: insuredData.insuredMobile,
    insuredNation: insuredData.insuredNation,
    insuredJobKind: insuredData.insuredJobKind,
    insuredEmail: insuredData.insuredEmail,
    insuredAddress: { ...insuredData.insuredAddress }
  })

  Object.assign(applicant, {
    applicantIsNatural: applicantData.applicantIsNatural === 'Y',
    applicantRepRela: applicantData.applicantRepRela,
    applicantidNo: applicantData.applicantidNo,
    lockApplicantCheckBox: applicantData.lockApplicantCheckBox,
    applicantName: applicantData.applicantName,
    applicantBirthdav: parseBirthday(applicantData.applicantBirthdav),
    applicantMobile: applicantData.applicantMobile,
    applicantNatural: applicantData.applicantNatural,
    applicantJobKind: applicantData.applicantJobKind,
    applicantEmail: applicantData.applicantEmail,
    applicantAddress: { ...applicantData.applicantAddress }
  })
}
// Status 0 同步
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

// Status 2 applicantIsNatural 切換
watch(() => applicant.applicantIsNatural, (newVal) => {
  if (status.value !== '2') return
  if (newVal) {
    // 回復被保人部分 + 原本填寫欄位
    applicant.applicantidNo = insured.insuredNo
    applicant.applicantName = insured.insuredName
    applicant.applicantMobile = insured.insuredMobile
    applicant.applicantBirthdav = { ...backupApplicant.applicantBirthdav }
    applicant.applicantNatural = backupApplicant.applicantNatural
    applicant.applicantJobKind = backupApplicant.applicantJobKind
    applicant.applicantEmail = backupApplicant.applicantEmail
    applicant.applicantAddress = { ...backupApplicant.applicantAddress }
  } else {
    // 存原本資料
    backupApplicant.applicantidNo = applicant.applicantidNo
    backupApplicant.applicantName = applicant.applicantName
    backupApplicant.applicantBirthdav = { ...applicant.applicantBirthdav }
    backupApplicant.applicantMobile = applicant.applicantMobile
    backupApplicant.applicantNatural = applicant.applicantNatural
    backupApplicant.applicantJobKind = applicant.applicantJobKind
    backupApplicant.applicantEmail = applicant.applicantEmail
    backupApplicant.applicantAddress = { ...applicant.applicantAddress }

    // 清空
    applicant.applicantidNo = ''
    applicant.applicantName = ''
    applicant.applicantBirthdav = { year: '', month: '', day: '' }
    applicant.applicantMobile = ''
    applicant.applicantNatural = ''
    applicant.applicantJobKind = ''
    applicant.applicantEmail = ''
    applicant.applicantAddress = { city: '', area: '', detail: '' }
  }
})

// 驗證 schema
const insuredSchema = z.object({
  insuredNo: z.string().min(1, '必填'),
  insuredName: z.string().min(1, '必填'),
  insuredBirthday: z.object({ year: z.string().min(1, '必填'), month: z.string().min(1, '必填'), day: z.string().min(1, '必填') }),
  insuredMobile: z.string().min(1, '必填'),
  insuredEmail: z.string().email('格式錯誤')
})
const applicantSchema = z.object({
  applicantidNo: z.string().min(1, '必填'),
  applicantName: z.string().min(1, '必填'),
  applicantBirthdav: z.object({ year: z.string().min(1, '必填'), month: z.string().min(1, '必填'), day: z.string().min(1, '必填') }),
  applicantMobile: z.string().min(1, '必填'),
  applicantEmail: z.string().email('格式錯誤')
})
const errors = reactive<Record<string, string>>({})

function validate() {
  const insuredResult = insuredSchema.safeParse(insured)
  const applicantResult = applicantSchema.safeParse(applicant)
  Object.keys(errors).forEach(k => delete errors[k])
  if (!insuredResult.success) {
    Object.assign(errors, Object.fromEntries(Object.entries(insuredResult.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] || ''])))
  }
  if (!applicantResult.success) {
    Object.assign(errors, Object.fromEntries(Object.entries(applicantResult.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] || ''])))
  }
  return insuredResult.success && applicantResult.success
}

function submitAll() {
  if (!validate()) return
  console.log({
    insured: { ...insured, insuredBirthday: formatBirthday(insured.insuredBirthday) },
    applicant: { ...applicant, applicantBirthdav: formatBirthday(applicant.applicantBirthdav), applicantIsNatural: applicant.applicantIsNatural ? 'Y' : 'N' }
  })
}

onMounted(() => initAPI())
</script>

<style scoped>
input,
select {
  display: block;
  margin-bottom: 8px;
}

.error {
  color: red;
  font-size: 12px;
  margin-bottom: 5px;
}
</style>
