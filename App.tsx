import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Lang = 'EN' | 'AL'
type ShiftType = 'Full Day' | 'Half Day'

type Worker = {
  id: number
  name: string
  pin: string
  dailyRate: number
  daysWorked: number
  totalPay: number
  isWorking: boolean
  startTime: string | null
  active: boolean
}

const INITIAL_WORKERS: Worker[] = [
  {
    id: 1,
    name: 'Amir',
    pin: '1234',
    dailyRate: 60,
    daysWorked: 0,
    totalPay: 0,
    isWorking: false,
    startTime: null,
    active: true,
  },
  {
    id: 2,
    name: 'Lina',
    pin: '2468',
    dailyRate: 70,
    daysWorked: 0,
    totalPay: 0,
    isWorking: false,
    startTime: null,
    active: true,
  },
  {
    id: 3,
    name: 'Rafi',
    pin: '1111',
    dailyRate: 55,
    daysWorked: 0,
    totalPay: 0,
    isWorking: false,
    startTime: null,
    active: true,
  },
  {
    id: 4,
    name: 'Maya',
    pin: '5555',
    dailyRate: 60,
    daysWorked: 0,
    totalPay: 0,
    isWorking: false,
    startTime: null,
    active: false,
  },
]

const labels: Record<
  Lang,
  {
    appView: string
    owner: string
    worker: string
    managerTitle: string
    carsToday: string
    lastCar: string
    minAgo: string
    hourAgo: string
    hoursAgo: string
    open: string
    closed: string
    noStaffOnSite: string
    workers: string
    liveReports: string
    money: string
    weather: string
    stock: string
    active: string
    late: string
    lastActivity: string
    reports: string
    upFromYesterday: string
    rainy: string
    lowerDemandExpected: string
    shampooLow: string
    shampooTitle: string
    shampooLowStatus: string
    clothsOk: string
    weeklyAttendance: string
    noDaysYet: string
    day: string
    days: string
    resetWeek: string
    fullDay: string
    halfDay: string
    workerShiftControls: string
    workerLogin: string
    pin: string
    enterPin: string
    invalidPin: string
    logIn: string
    myWeek: string
    logOut: string
    mainControls: string
    todaysOverview: string
    weeklyAttendanceSummary: string
    workerSettings: string
    manageWorkers: string
    status: string
    backToDashboard: string
    addWorker: string
    workerName: string
    save: string
    saveWorker: string
    edit: string
    deactivate: string
    reactivate: string
    pinInUse: string
    dailyRate: string
    workerActive: string
    workerInactive: string
    working: string
    notWorking: string
    startWork: string
    endWork: string
    chooseShiftType: string
    daysThisWeek: string
    earned: string
    started: string
    shiftSaved: string
    totalWeeklyStaffCost: string
    continueWithManager: string
    trialEnded: string
    monthlyPrice: string
    subscribeNow: string
    backToWorkerMode: string
    cancelAnytime: string
    trialBanner: string
    trialTestMode: string
    trialReal: string
    trialActiveMock: string
    trialExpiredMock: string
  }
> = {
  EN: {
    appView: 'App view',
    owner: 'Owner',
    worker: 'Worker',
    managerTitle: 'Car Wash Manager',
    carsToday: 'cars today',
    lastCar: 'Last car',
    minAgo: 'min ago',
    hourAgo: 'hour ago',
    hoursAgo: 'hours ago',
    open: 'Open',
    closed: 'Closed',
    noStaffOnSite: '0 active workers',
    workers: 'Workers',
    liveReports: 'Live Reports',
    money: 'Money',
    weather: 'Weather',
    stock: 'Stock',
    active: 'active',
    late: 'late',
    lastActivity: 'Last activity',
    reports: 'reports',
    upFromYesterday: 'Up from yesterday',
    rainy: 'Rainy',
    lowerDemandExpected: 'Lower demand expected',
    shampooLow: 'Shampoo LOW',
    shampooTitle: 'Shampoo',
    shampooLowStatus: 'LOW',
    clothsOk: 'Cloths OK',
    weeklyAttendance: 'Weekly Attendance',
    noDaysYet: 'No days yet',
    day: 'day',
    days: 'days',
    resetWeek: 'Reset Week',
    fullDay: 'Full Day',
    halfDay: 'Half Day',
    workerShiftControls: 'Worker shift controls',
    workerLogin: 'Worker Login',
    pin: 'PIN',
    enterPin: 'Enter PIN',
    invalidPin: 'Invalid PIN',
    logIn: 'Log in',
    myWeek: 'This week',
    logOut: 'Log out',
    mainControls: 'Main controls',
    todaysOverview: "Today's overview",
    weeklyAttendanceSummary: 'Weekly attendance summary',
    workerSettings: 'Worker Settings',
    manageWorkers: 'Manage Workers',
    status: 'Status',
    backToDashboard: 'Back to Dashboard',
    addWorker: 'Add Worker',
    workerName: 'Worker name',
    save: 'Save',
    saveWorker: 'Save Worker',
    edit: 'Edit',
    deactivate: 'Deactivate',
    reactivate: 'Reactivate',
    pinInUse: 'PIN already in use',
    dailyRate: 'Daily Rate',
    workerActive: 'Active',
    workerInactive: 'Inactive',
    working: 'Working',
    notWorking: 'Not working',
    startWork: 'START WORK',
    endWork: 'END WORK',
    chooseShiftType: 'Choose shift type',
    daysThisWeek: 'Days this week',
    earned: 'Earned',
    started: 'Started',
    shiftSaved: 'Shift saved',
    totalWeeklyStaffCost: 'Total weekly staff cost',
    continueWithManager: 'Continue with Car Wash Manager',
    trialEnded: 'Your free trial has ended',
    monthlyPrice: '£25 / month',
    subscribeNow: 'Subscribe Now',
    backToWorkerMode: 'Back to Worker Mode',
    cancelAnytime: 'Cancel anytime',
    trialBanner: 'Free trial',
    trialTestMode: 'Trial test mode',
    trialReal: 'Real',
    trialActiveMock: 'Force active',
    trialExpiredMock: 'Force expired',
  },
  AL: {
    appView: 'Pamja e aplikacionit',
    owner: 'Pronari',
    worker: 'Punetori',
    managerTitle: 'Menaxheri i Lavazhit',
    carsToday: 'makina sot',
    lastCar: 'Makina e fundit',
    minAgo: 'min me pare',
    hourAgo: 'ore me pare',
    hoursAgo: 'ore me pare',
    open: 'Hapur',
    closed: 'Mbyllur',
    noStaffOnSite: '0 punetore aktive',
    workers: 'Punetoret',
    liveReports: 'Raporte Live',
    money: 'Parate',
    weather: 'Moti',
    stock: 'Stoku',
    active: 'aktiv',
    late: 'me vonese',
    lastActivity: 'Aktiviteti i fundit',
    reports: 'raporte',
    upFromYesterday: 'Me shume se dje',
    rainy: 'Me shi',
    lowerDemandExpected: 'Pritet kerkese me e ulet',
    shampooLow: 'Shampo e ULET',
    shampooTitle: 'Shampo',
    shampooLowStatus: 'ULET',
    clothsOk: 'Leckat OK',
    weeklyAttendance: 'Pjesemarrja Javore',
    noDaysYet: 'Asnje dite ende',
    day: 'dite',
    days: 'dite',
    resetWeek: 'Rivendos Javen',
    fullDay: 'Dite e Plote',
    halfDay: 'Gjysme Dite',
    workerShiftControls: 'Kontrollet e turnit te punetorit',
    workerLogin: 'Hyrja e Punetorit',
    pin: 'PIN',
    enterPin: 'Vendos PIN',
    invalidPin: 'PIN i pavlefshem',
    logIn: 'Hyr',
    myWeek: 'Kjo jave',
    logOut: 'Dil',
    mainControls: 'Kontrollet Kryesore',
    todaysOverview: 'Pamja e sotme',
    weeklyAttendanceSummary: 'Permbledhja javore e pjesemarrjes',
    workerSettings: 'Cilësimet e Punëtorëve',
    manageWorkers: 'Menaxho Punëtorët',
    status: 'Statusi',
    backToDashboard: 'Kthehu te Paneli',
    addWorker: 'Shto Punëtor',
    workerName: 'Emri i punëtorit',
    save: 'Ruaj',
    saveWorker: 'Ruaj Punëtorin',
    edit: 'Ndrysho',
    deactivate: 'Çaktivizo',
    reactivate: 'Riaktivizo',
    pinInUse: 'PIN tashmë në përdorim',
    dailyRate: 'Paga Ditore',
    workerActive: 'Aktiv',
    workerInactive: 'Jo aktiv',
    working: 'Ne pune',
    notWorking: 'Jo ne pune',
    startWork: 'Nis Punen',
    endWork: 'Mbaro Punen',
    chooseShiftType: 'Zgjidh llojin e turnit',
    daysThisWeek: 'Dite kete jave',
    earned: 'Fitimi',
    started: 'Nisi',
    shiftSaved: 'Turni u ruajt',
    totalWeeklyStaffCost: 'Kosto totale javore e stafit',
    continueWithManager: 'Vazhdo me Car Wash Manager',
    trialEnded: 'Prova falas 2-ditore ka perfunduar',
    monthlyPrice: '£25 / month',
    subscribeNow: 'Abonohu Tani',
    backToWorkerMode: 'Kthehu ne Modin e Punetorit',
    cancelAnytime: 'Anulo kurdo',
    trialBanner: 'Prove falas',
    trialTestMode: 'Menyra e testit te proves',
    trialReal: 'Reale',
    trialActiveMock: 'Detyro aktive',
    trialExpiredMock: 'Detyro skaduar',
  },
}

function formatDaysLabel(total: number, t: (typeof labels)['EN']): string {
  if (total === 1) return `1 ${t.day}`
  return `${total} ${t.days}`
}

function formatDaysNumber(total: number): string {
  if (total % 1 === 0) return String(total)
  return total.toFixed(1)
}

function App() {
  const minutesSinceLastCar = 25
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS)

  const validPins = useMemo(
    () => new Set(workers.filter((w) => w.active).map((w) => w.pin)),
    [workers],
  )
  const workerByPin = useMemo(() => new Map(workers.map((w) => [w.pin, w])), [workers])
  const workerById = useMemo(() => new Map(workers.map((w) => [w.id, w])), [workers])

  const [view, setView] = useState<'owner' | 'worker'>('owner')
  const [ownerPage, setOwnerPage] = useState<'dashboard' | 'manageWorkers'>('dashboard')
  const [trialTestMode] = useState<'real' | 'active' | 'expired'>('real')
  const [trialStartDate, setTrialStartDate] = useState<string | null>(() =>
    localStorage.getItem('trialStartDate'),
  )
  const [subscribed, setSubscribed] = useState<boolean>(
    () => localStorage.getItem('isSubscribed') === 'true',
  )
  const [lang, setLang] = useState<Lang>('EN')
  const [pin, setPin] = useState('')
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null)
  const [showShiftPopup, setShowShiftPopup] = useState(false)
  const [shiftConfirmation, setShiftConfirmation] = useState<{
    daysWorked: number
    totalPay: number
  } | null>(null)
  const [workerError, setWorkerError] = useState('')
  const [manageError, setManageError] = useState('')
  const [showAddWorkerForm, setShowAddWorkerForm] = useState(false)
  const [editingWorkerId, setEditingWorkerId] = useState<number | null>(null)
  const [newWorkerName, setNewWorkerName] = useState('')
  const [newWorkerPin, setNewWorkerPin] = useState('')
  const [newWorkerRate, setNewWorkerRate] = useState('60')
  const [editWorkerName, setEditWorkerName] = useState('')
  const [editWorkerPin, setEditWorkerPin] = useState('')
  const [editWorkerRate, setEditWorkerRate] = useState('60')
  const [editWorkerActive, setEditWorkerActive] = useState(true)

  const t = labels[lang]

  const anyoneWorking = useMemo(() => workers.some((w) => w.isWorking), [workers])
  const businessOpen = anyoneWorking
  const workingCount = useMemo(() => workers.filter((w) => w.isWorking).length, [workers])
  const totalWeeklyStaffCost = useMemo(
    () => workers.reduce((sum, worker) => sum + worker.totalPay, 0),
    [workers],
  )
  const minutesSinceLastWorkerActivity = workingCount > 0 ? 3 : 27

  const formatRelativeTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} ${t.minAgo}`
    const hours = Math.floor(minutes / 60)
    return `${hours} ${hours === 1 ? t.hourAgo : t.hoursAgo}`
  }
  const carActivityLabel = `${t.lastCar}: ${formatRelativeTime(minutesSinceLastCar)}`
  const trialLengthMs = 2 * 24 * 60 * 60 * 1000
  const trialValidUntil = trialStartDate ? new Date(trialStartDate).getTime() + trialLengthMs : 0
  const trialDaysLeftReal = trialStartDate
    ? Math.max(0, Math.ceil((trialValidUntil - Date.now()) / (24 * 60 * 60 * 1000)))
    : 0
  const trialActiveReal = Boolean(trialStartDate && Date.now() < trialValidUntil)
  const trialActive =
    trialTestMode === 'active'
      ? true
      : trialTestMode === 'expired'
        ? false
        : trialActiveReal
  const trialDaysLeft = trialTestMode === 'active' ? 2 : trialTestMode === 'expired' ? 0 : trialDaysLeftReal
  const ownerAllowed = subscribed || trialActive

  const currentWorker = currentWorkerId != null ? workerById.get(currentWorkerId) : undefined

  useEffect(() => {
    if (view !== 'owner') return
    if (subscribed) return
    if (trialStartDate) return
    const now = new Date().toISOString()
    setTrialStartDate(now)
    localStorage.setItem('trialStartDate', now)
  }, [view, subscribed, trialStartDate])

  const handleWorkerLogin = (event: FormEvent) => {
    event.preventDefault()
    const cleanPin = pin.trim()
    const found = workerByPin.get(cleanPin)
    if (!found || !found.active || !validPins.has(cleanPin)) {
      setWorkerError(t.invalidPin)
      return
    }
    setWorkerError('')
    setCurrentWorkerId(found.id)
    setShowShiftPopup(false)
    setShiftConfirmation(null)
    setPin('')
  }

  const handleStartWork = () => {
    if (currentWorkerId == null) return
    setShiftConfirmation(null)
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === currentWorkerId
          ? { ...w, isWorking: true, startTime: new Date().toISOString() }
          : w,
      ),
    )
  }

  const handleCompleteShift = (shiftType: ShiftType) => {
    if (currentWorkerId == null) return
    const w = workerById.get(currentWorkerId)
    if (!w) return

    const dayAdd = shiftType === 'Full Day' ? 1 : 0.5
    const payAdd = shiftType === 'Full Day' ? w.dailyRate : w.dailyRate / 2
    const nextDaysWorked = Number((w.daysWorked + dayAdd).toFixed(1))
    const nextTotalPay = Number((w.totalPay + payAdd).toFixed(2))
    setWorkers((prev) =>
      prev.map((worker) => {
        if (worker.id !== currentWorkerId) return worker
        return {
          ...worker,
          daysWorked: nextDaysWorked,
          totalPay: nextTotalPay,
          isWorking: false,
          startTime: null,
        }
      }),
    )
    setShiftConfirmation({ daysWorked: nextDaysWorked, totalPay: nextTotalPay })
    setShowShiftPopup(false)
    setWorkerError('')
  }

  const handleWorkerLogout = () => {
    setCurrentWorkerId(null)
    setShowShiftPopup(false)
    setShiftConfirmation(null)
    setWorkerError('')
  }

  const handleResetWeek = () => {
    setWorkers((prev) =>
      prev.map((w) => ({
        ...w,
        daysWorked: 0,
        totalPay: 0,
        isWorking: false,
        startTime: null,
      })),
    )
  }

  const handleStartEditWorker = (id: number) => {
    const worker = workers.find((entry) => entry.id === id)
    if (!worker) return
    setManageError('')
    setEditingWorkerId(id)
    setEditWorkerName(worker.name)
    setEditWorkerPin(worker.pin)
    setEditWorkerRate(String(worker.dailyRate))
    setEditWorkerActive(worker.active)
  }

  const handleSaveWorkerEdit = (event: FormEvent) => {
    event.preventDefault()
    if (editingWorkerId == null) return
    const name = editWorkerName.trim()
    const nextPin = editWorkerPin.trim()
    const nextRate = Math.max(0, Number(editWorkerRate) || 0)
    if (!name || !nextPin) return
    if (workers.some((w) => w.pin === nextPin && w.id !== editingWorkerId)) {
      setManageError(t.pinInUse)
      return
    }
    setManageError('')
    setWorkers((current) =>
      current.map((worker) =>
        worker.id === editingWorkerId
          ? { ...worker, name, pin: nextPin, dailyRate: nextRate, active: editWorkerActive }
          : worker,
      ),
    )
    if (!editWorkerActive && currentWorkerId === editingWorkerId) {
      setCurrentWorkerId(null)
    }
    setEditingWorkerId(null)
  }

  const handleAddWorker = (event: FormEvent) => {
    event.preventDefault()
    const name = newWorkerName.trim()
    const pinCode = newWorkerPin.trim()
    const rate = Math.max(0, Number(newWorkerRate) || 0)
    if (!name || !pinCode) return
    if (workers.some((worker) => worker.pin === pinCode)) {
      setManageError(t.pinInUse)
      return
    }
    setManageError('')
    const nextId = Math.max(0, ...workers.map((w) => w.id)) + 1
    setWorkers((current) => [
      ...current,
      {
        id: nextId,
        name,
        pin: pinCode,
        dailyRate: rate,
        daysWorked: 0,
        totalPay: 0,
        isWorking: false,
        startTime: null,
        active: true,
      },
    ])
    setShowAddWorkerForm(false)
    setNewWorkerName('')
    setNewWorkerPin('')
    setNewWorkerRate('60')
  }

  return (
    <main className="dashboard">
      <div className="top-row">
        <div className="view-switch" role="tablist" aria-label={t.appView}>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'owner'}
            className={view === 'owner' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setView('owner')}
          >
            {t.owner}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'worker'}
            className={view === 'worker' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setView('worker')}
          >
            {t.worker}
          </button>
        </div>

        <div className="lang-switch" role="group" aria-label="Language">
          <button
            type="button"
            className={lang === 'EN' ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang('EN')}
          >
            EN
          </button>
          <button
            type="button"
            className={lang === 'AL' ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang('AL')}
          >
            AL
          </button>
        </div>
      </div>

      {view === 'owner' ? (
        <>
          {ownerAllowed ? (
          <>
          {ownerPage === 'dashboard' ? (
            <>
              <section className="hero" aria-label={t.todaysOverview}>
                <p className="hero-label">{t.managerTitle}</p>
                <h1>47 {t.carsToday}</h1>
                <div className="hero-stats">
                  <p className="hero-pill neutral">{carActivityLabel}</p>
                  <p className={businessOpen ? 'hero-pill positive' : 'hero-pill closed'}>
                    {businessOpen ? t.open : t.closed}
                  </p>
                </div>
              </section>

              <section className="cards" aria-label={t.mainControls}>
                <div className="card">
                  <div className="card-head">
                    <span className="card-icon" aria-hidden="true">
                      👷
                    </span>
                    <h2>{t.workers}</h2>
                  </div>
                  <p className="card-value">
                    {workingCount > 0 ? `${workingCount} ${t.active}` : t.noStaffOnSite}
                  </p>
                  {workingCount > 0 ? (
                    <p className="card-subtitle">
                      {t.lastActivity}: {minutesSinceLastWorkerActivity} {t.minAgo}
                    </p>
                  ) : null}
                </div>
                <div className="card">
                  <div className="card-head">
                    <span className="card-icon" aria-hidden="true">
                      📋
                    </span>
                    <h2>{t.liveReports}</h2>
                  </div>
                  <p className="card-value">2 {t.reports}</p>
                </div>
                <div className="card">
                  <div className="card-head">
                    <span className="card-icon" aria-hidden="true">
                      💷
                    </span>
                    <h2>{t.money}</h2>
                  </div>
                  <p className="card-value">£320</p>
                  <p className="card-subtitle">{t.upFromYesterday}</p>
                </div>

                <div className="trial-tools trial-inline">
                  <p className="attendance-total trial-banner">
                    <span className="trial-clock" aria-hidden="true">
                      🕒
                    </span>
                    {t.trialBanner}: {trialDaysLeft} {trialDaysLeft === 1 ? t.day : t.days} left
                  </p>
                </div>

                <div className="card">
                  <div className="card-head">
                    <span className="card-icon" aria-hidden="true">
                      🧴
                    </span>
                    <h2>{t.stock}</h2>
                  </div>
                  <p className="card-value">{t.shampooTitle}</p>
                  <p className="card-subtitle">{t.shampooLowStatus} • {t.clothsOk}</p>
                </div>
                <div className="card">
                  <div className="card-head">
                    <span className="card-icon" aria-hidden="true">
                      🌧️
                    </span>
                    <h2>{t.weather}</h2>
                  </div>
                  <p className="card-value">{t.rainy}</p>
                  <p className="card-subtitle">{t.lowerDemandExpected}</p>
                </div>
              </section>

              <section className="week-section" aria-label={t.weeklyAttendanceSummary}>
                <h2>{t.weeklyAttendance}</h2>
                <div className="week-list attendance-lines" role="list">
                  {workers.map((worker) => (
                    <p className="attendance-line" key={worker.id} role="listitem">
                      <span className="attendance-name">{worker.name}</span>
                      <span className="attendance-days">{formatDaysLabel(worker.daysWorked, t)}</span>
                      <span className="attendance-pay">£{worker.totalPay}</span>
                    </p>
                  ))}
                </div>
                <p className="attendance-total">
                  {t.totalWeeklyStaffCost}: £{Number(totalWeeklyStaffCost.toFixed(2))}
                </p>
                <button type="button" className="secondary-btn" onClick={handleResetWeek}>
                  {t.resetWeek}
                </button>
              </section>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => setOwnerPage('manageWorkers')}
              >
                {t.manageWorkers}
              </button>
            </>
          ) : (
            <section className="week-section" aria-label={t.workerSettings}>
              <div className="manage-header">
                <h2>{t.manageWorkers}</h2>
                <button
                  type="button"
                  className="secondary-btn compact-btn"
                  onClick={() => setOwnerPage('dashboard')}
                >
                  {t.backToDashboard}
                </button>
              </div>

              <button
                type="button"
                className="primary-btn"
                onClick={() => setShowAddWorkerForm((current) => !current)}
              >
                {t.addWorker}
              </button>

              {showAddWorkerForm ? (
                <form className="worker-form" onSubmit={handleAddWorker}>
                  <label>{t.workerName}</label>
                  <input value={newWorkerName} onChange={(e) => setNewWorkerName(e.target.value)} />
                  <label>{t.pin}</label>
                  <input
                    value={newWorkerPin}
                    maxLength={4}
                    onChange={(e) => setNewWorkerPin(e.target.value)}
                  />
                  <label>{t.dailyRate}</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={newWorkerRate}
                    onChange={(e) => setNewWorkerRate(e.target.value)}
                  />
                  {manageError ? <p className="form-error">{manageError}</p> : null}
                  <button type="submit" className="primary-btn">
                    {t.saveWorker}
                  </button>
                </form>
              ) : null}

              <div className="week-list">
                {workers.map((worker) => (
                  <article className="worker-card" key={worker.id}>
                    <p className="week-worker-name">{worker.name}</p>
                    <p className="week-total">£{worker.dailyRate}/day</p>
                    <p className="week-total">
                      {worker.active ? t.workerActive : t.workerInactive}
                    </p>
                    <button
                      type="button"
                      className="secondary-btn compact-btn"
                      onClick={() => handleStartEditWorker(worker.id)}
                    >
                      {t.edit}
                    </button>
                  </article>
                ))}
              </div>

              {editingWorkerId != null ? (
                <form className="worker-form" onSubmit={handleSaveWorkerEdit}>
                  <h2>{t.edit}</h2>
                  <label>{t.workerName}</label>
                  <input
                    value={editWorkerName}
                    onChange={(event) => setEditWorkerName(event.target.value)}
                  />
                  <label>{t.pin}</label>
                  <input
                    value={editWorkerPin}
                    maxLength={4}
                    onChange={(event) => setEditWorkerPin(event.target.value)}
                  />
                  <label>{t.dailyRate}</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={editWorkerRate}
                    onChange={(event) => setEditWorkerRate(event.target.value)}
                  />
                  <label>{t.status}</label>
                  <div className="day-type-picker">
                    <button
                      type="button"
                      className={editWorkerActive ? 'shift-btn active' : 'shift-btn'}
                      onClick={() => setEditWorkerActive(true)}
                    >
                      {t.workerActive}
                    </button>
                    <button
                      type="button"
                      className={!editWorkerActive ? 'shift-btn active' : 'shift-btn'}
                      onClick={() => setEditWorkerActive(false)}
                    >
                      {t.workerInactive}
                    </button>
                  </div>
                  {manageError ? <p className="form-error">{manageError}</p> : null}
                  <div className="logout-actions">
                    <button type="submit" className="primary-btn">
                      {t.save}
                    </button>
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => setEditWorkerActive((current) => !current)}
                    >
                      {editWorkerActive ? t.deactivate : t.reactivate}
                    </button>
                  </div>
                </form>
              ) : null}
            </section>
          )}
          </>
          ) : (
        <section className="week-section subscribe-screen">
          <div className="subscribe-header">
            <h2 className="subscribe-title">{t.continueWithManager}</h2>
            <p className="subscribe-subtitle">{t.trialEnded}</p>
          </div>

          <div className="subscribe-bullets" aria-label="Subscription benefits">
            <p className="subscribe-bullet">• Track workers automatically</p>
            <p className="subscribe-bullet">• Know exactly how much to pay staff</p>
            <p className="subscribe-bullet">• No paperwork, no confusion</p>
          </div>

          <p className="subscribe-price">{t.monthlyPrice}</p>

              <button
                type="button"
            className="primary-btn subscribe-primary"
                onClick={() => {
                  setSubscribed(true)
                  localStorage.setItem('isSubscribed', 'true')
                }}
              >
                {t.subscribeNow}
              </button>
              <button
                type="button"
            className="secondary-btn subscribe-back"
                onClick={() => setView('worker')}
              >
                {t.backToWorkerMode}
              </button>
          <p className="subscribe-cancel">{t.cancelAnytime}</p>
            </section>
          )}
        </>
      ) : (
        <section className="worker-screen" aria-label={t.workerShiftControls}>
          {currentWorkerId == null ? (
            <form className="worker-form" onSubmit={handleWorkerLogin}>
              <h1>{t.managerTitle}</h1>
              <p className="worker-status-line">{t.workerLogin}</p>
              <label htmlFor="worker-pin">{t.pin}</label>
              <input
                id="worker-pin"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder={t.enterPin}
                maxLength={4}
                value={pin}
                onChange={(event) => setPin(event.target.value)}
              />
              {workerError ? <p className="form-error">{workerError}</p> : null}
              <button type="submit" className="primary-btn">
                {t.logIn}
              </button>
            </form>
          ) : currentWorker ? (
            <div className="worker-form worker-shift-panel">
              <div className="worker-name-card">{currentWorker.name}</div>
              <p className="worker-status-line">
                {t.status}: {currentWorker.isWorking ? t.working : t.notWorking}
              </p>

              {!currentWorker.isWorking ? (
                <>
                  <button type="button" className="worker-main-btn" onClick={handleStartWork}>
                    {t.startWork}
                  </button>
                  <button type="button" className="secondary-btn" onClick={handleWorkerLogout}>
                    {t.logOut}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="worker-main-btn worker-main-btn-end"
                    onClick={() => setShowShiftPopup(true)}
                  >
                    {t.endWork}
                  </button>
                </>
              )}

              {showShiftPopup ? (
                <div
                  className="shift-popup-backdrop"
                  role="presentation"
                  onClick={() => setShowShiftPopup(false)}
                >
                  <div
                    className="shift-popup"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="shift-popup-title"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <p id="shift-popup-title" className="shift-popup-title">
                      {t.chooseShiftType}
                    </p>
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => handleCompleteShift('Full Day')}
                    >
                      {t.fullDay}
                    </button>
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => handleCompleteShift('Half Day')}
                    >
                      {t.halfDay}
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="worker-week-stats">
                <p className="worker-stat-line">
                  <span className="worker-stat-label">{t.daysThisWeek}:</span>{' '}
                  <span className="worker-stat-value">
                    {formatDaysNumber(currentWorker.daysWorked)}
                  </span>
                </p>
                <p className="worker-stat-line">
                  <span className="worker-stat-label">{t.earned}:</span>{' '}
                  <span className="worker-stat-value">£{currentWorker.totalPay}</span>
                </p>
              </div>

              {shiftConfirmation ? (
                <p className="worker-confirm">
                  {t.shiftSaved}: {formatDaysNumber(shiftConfirmation.daysWorked)} {t.days} - £
                  {shiftConfirmation.totalPay}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      )}
    </main>
  )
}

export default App
