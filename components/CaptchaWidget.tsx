'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface CaptchaWidgetProps {
  onVerify: (isValid: boolean, captchaToken?: string) => void;
  className?: string;
}

export default function CaptchaWidget({ onVerify, className = '' }: CaptchaWidgetProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState<'+' | 'x'>('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'unverified' | 'valid' | 'invalid'>('unverified');

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const n2 = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const op = Math.random() > 0.5 ? '+' : 'x';
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setUserAnswer('');
    setStatus('unverified');
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const getExpected = () => {
    if (operator === '+') return num1 + num2;
    return num1 * num2;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setUserAnswer(val);

    if (val === '') {
      setStatus('unverified');
      onVerify(false);
      return;
    }

    const expected = getExpected();
    if (parseInt(val, 10) === expected) {
      setStatus('valid');
      onVerify(true, `cap_${Date.now()}_${expected}`);
    } else {
      setStatus('invalid');
      onVerify(false);
    }
  };

  return (
    <div className={`p-3.5 rounded-2xl bg-[#F5EBE0]/60 border border-[#D5BDAF] space-y-2 text-xs ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 font-semibold text-[#382F28]">
          <ShieldCheck className="w-4 h-4 text-[#8C7769]" />
          <span>Security Verification</span>
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          className="text-[11px] text-[#7E6F64] hover:text-[#261E18] flex items-center space-x-1 transition-colors"
          title="Reload Captcha"
        >
          <RefreshCw className="w-3 h-3 text-[#8C7769]" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex items-center space-x-3">
        {/* Visual math captcha badge */}
        <div className="flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-[#D5BDAF] shadow-xs select-none">
          <span className="font-mono text-base font-extrabold text-[#261E18] tracking-widest">
            {num1} {operator === '+' ? '+' : '×'} {num2} = ?
          </span>
        </div>

        {/* Input answer */}
        <div className="relative flex-1">
          <input
            type="number"
            required
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="Enter answer"
            className={`w-full bg-white border rounded-xl py-2 px-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none transition-colors ${
              status === 'valid'
                ? 'border-emerald-500 ring-1 ring-emerald-500'
                : status === 'invalid'
                ? 'border-red-400 ring-1 ring-red-400'
                : 'border-[#D5BDAF] focus:border-[#382F28]'
            }`}
          />
          {status === 'valid' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-2.5 top-2.5" />
          )}
          {status === 'invalid' && (
            <AlertCircle className="w-4 h-4 text-red-500 absolute right-2.5 top-2.5" />
          )}
        </div>
      </div>

      {status === 'invalid' && (
        <p className="text-[11px] text-red-600 font-medium">
          Incorrect answer, please check your calculation.
        </p>
      )}
      {status === 'valid' && (
        <p className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Verification confirmed</span>
        </p>
      )}
    </div>
  );
}
