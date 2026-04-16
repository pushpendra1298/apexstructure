import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, ArrowLeftRight, QrCode, Smartphone, Lock, Copy, CheckCircle2, ShieldCheck } from 'lucide-react'

const PAYMENT_DATA = {
  accountHolder: 'Aditya Singh',
  accountNumber: '50100867723226',
  ifsc: 'HDFC0000192',
  branch: 'Gwalior, Madhya Pradesh',
  //  accountType: 'CURRENT',
  upiId: '7771907709@hdfc',
  phone: '+91 79701 47690',
}

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false)

  const copyText = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-200 break-all">{value}</p>
      </div>
      <button
        onClick={copyText}
        className="flex items-center gap-2 rounded-xl border border-orange-400/20 bg-orange-500/10 px-3 py-2 text-xs font-bold text-orange-300 transition hover:scale-105 hover:bg-orange-500/20"
      >
        {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function PaymentCard({ flipped }) {
  const FooterNote = () => (
    <div className="w-full rounded-2xl border border-orange-400/15 bg-orange-500/5 px-4 py-3 text-center">
      <p className="text-xs leading-6 text-white/60">
        After completing the transfer, please send the transaction details to:
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-orange-300">
        <span>{PAYMENT_DATA.email}</span>
        <span className="text-white/20">•</span>
        <span>{PAYMENT_DATA.phone}</span>
      </div>
    </div>
  )

  return (
    <div className="w-full [perspective:1000px]">
      <div
        className="relative w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT: UPI */}
        <div className="w-full [backface-visibility:hidden]">
          <div className="min-h-[420px] sm:min-h-[460px] rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="border-b border-orange-400/10 bg-gradient-to-r from-orange-500/10 to-transparent px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <QrCode size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">UPI Payment</h2>
                  <p className="text-xs text-white/40">Fast • Secure • Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
                <ShieldCheck size={12} /> Verified
              </div>
            </div>

            <div className="p-4 flex-grow flex flex-col gap-2">
              <div className="mx-auto w-fit mb-2 rounded-3xl bg-white p-3 shadow-2xl">
                <img
                  src={`/qrcode.jpeg`}
                  alt="QR"
                  className="h-[150px] w-[150px] rounded-xl"
                />
              </div>
              <CopyRow label="UPI ID" value={PAYMENT_DATA.upiId} />
              <CopyRow label="Account Holder" value={PAYMENT_DATA.accountHolder} />
              <div className="mt-auto"><FooterNote /></div>
            </div>
          </div>
        </div>

        {/* BACK: BANK */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="min-h-[420px] sm:min-h-[460px] rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="border-b border-orange-400/10 bg-gradient-to-r from-orange-500/10 to-transparent px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Building2 size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Bank Transfer</h2>
                  <p className="text-xs text-white/40">Fast • Secure • Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
                <ShieldCheck size={12} /> Verified
              </div>
            </div>

            <div className="p-4 flex-grow flex flex-col gap-2">
              <CopyRow label="Account Holder" value={PAYMENT_DATA.accountHolder} />
              <CopyRow label="Account Number" value={PAYMENT_DATA.accountNumber} />
              <CopyRow label="IFSC" value={PAYMENT_DATA.ifsc} />
              <CopyRow label="Branch" value={PAYMENT_DATA.branch} />
              <div className="mt-auto"><FooterNote /></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function PremiumPaymentPage() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-start justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_40%)]" />
      <div className="relative z-10 w-full max-w-lg pt-10 sm:pt-16 pb-8">
        <div className="mb-1 px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ color: '#fb923c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>

          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight mb-2">
            Payment {' '}
            <span style={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Details
            </span>
          </motion.h1>
        </div>

        <PaymentCard flipped={flipped} />

        <button
          onClick={() => setFlipped(!flipped)}
          className="mt-0 w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.02]"
        >
          <ArrowLeftRight size={16} />
          {flipped ? 'Switch to UPI Payment' : 'Switch to Bank Transfer'}
        </button>


      </div>
    </div>
  )
}
