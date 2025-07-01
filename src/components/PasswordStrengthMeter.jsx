import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const getPasswordStrength = () => {
    let score = 0;
    if (!password) return 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (password.length < 6) return 1;

    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['ضعيف جداً', 'ضعيف', 'متوسط', 'قوي', 'قوي جداً'];
  const strengthColors = [
    'bg-red-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];

  return (
    <div className="w-full mt-2">
      <div className="flex h-2 rounded-full overflow-hidden bg-gray-600">
        <div
          className={`transition-all duration-300 ${strengthColors[strength]}`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
      {password && (
        <p className={`text-xs mt-1 ${strength > 2 ? 'text-green-400' : 'text-yellow-400'}`}>
          القوة: {strengthLabels[strength]}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;