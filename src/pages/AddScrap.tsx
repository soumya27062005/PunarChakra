import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MaterialCard } from '@/components/MaterialCard';
import { materials, materialMap } from '@/data/materials';
import { recyclers } from '@/data/recyclers';
import { useApp } from '@/context/AppContext';
import type { MaterialCategory, Condition, Lot } from '@/types';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Scale,
  Package,
  CheckCircle2,
  Copy,
} from 'lucide-react';

const conditions: Condition[] = ['Good', 'Used', 'Damaged'];

export function AddScrap() {
  const navigate = useNavigate();
  const { addLot, lotCounter } = useApp();
  const [step, setStep] = useState(1);
  const [material, setMaterial] = useState<MaterialCategory | null>(null);
  const [weight, setWeight] = useState<number>(5);
  const [condition, setCondition] = useState<Condition | null>(null);
  const [created, setCreated] = useState(false);
  const [lotId, setLotId] = useState('');
  const [copied, setCopied] = useState(false);

  const estimatedValue = material
    ? Math.round(((materialMap[material].priceLow + materialMap[material].priceHigh) / 2) * weight)
    : 0;

  const handleCreate = () => {
    const id = `PC-2026-${String(lotCounter).padStart(5, '0')}`;
    const newLot: Lot = {
      id,
      material: material!,
      weight,
      condition: condition!,
      estimatedValue,
      quotedPrice: Math.round(estimatedValue * 0.95),
      recycler: recyclers[0].name,
      createdDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Lot Created',
    };
    addLot(newLot);
    setLotId(id);
    setCreated(true);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(lotId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (created) {
    return (
      <AppLayout title="Lot Created">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Lot Created Successfully!</h2>
          <p className="text-sm text-gray-500 mb-4">Your e-waste lot has been registered.</p>

          <Card padding="lg" className="w-full max-w-sm mb-4">
            <p className="text-xs text-gray-400 mb-1">Lot ID</p>
            <div className="flex items-center justify-between gap-2">
              <p className="text-lg font-bold text-gray-900 font-mono">{lotId}</p>
              <button onClick={handleCopy} className="p-1.5 hover:bg-gray-50 rounded-lg">
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Material</span>
                <span className="font-semibold text-gray-900">{material}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Weight</span>
                <span className="font-semibold text-gray-900">{weight} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Condition</span>
                <span className="font-semibold text-gray-900">{condition}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Est. Value</span>
                <span className="font-bold text-emerald-600">₹{estimatedValue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2 w-full max-w-sm">
            <Button variant="outline" fullWidth onClick={() => navigate('/lots')}>
              View Lots
            </Button>
            <Button variant="primary" fullWidth onClick={() => navigate('/recyclers')}>
              Find Recycler
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Add Scrap">
      {/* Step indicator */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Step {step} of 4</span>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-xs font-medium text-gray-500"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          )}
        </div>
        <ProgressBar current={step} total={4} />
      </div>

      {/* Step 1: Choose material */}
      {step === 1 && (
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Choose Material</h3>
          <p className="text-sm text-gray-500 mb-4">What type of e-waste do you have?</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {materials.map((m) => (
              <MaterialCard
                key={m.id}
                material={m}
                selected={material === m.name}
                onClick={() => setMaterial(m.name)}
              />
            ))}
          </div>

          {/* AI placeholder */}
          {material && (
            <Card padding="md" className="mt-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">AI Material Detection</span>
                <Badge variant="success" size="sm">Demo</Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{material} detected</p>
                  <p className="text-xs text-gray-500">Estimated confidence: 92%</p>
                </div>
              </div>
            </Card>
          )}

          <div className="mt-5">
            <Button
              fullWidth
              size="lg"
              disabled={!material}
              onClick={() => setStep(2)}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Weight */}
      {step === 2 && (
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Approximate Weight</h3>
          <p className="text-sm text-gray-500 mb-4">How much {material} do you have?</p>

          <Card padding="lg" className="mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Scale className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="flex items-baseline justify-center gap-1">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
                  className="text-4xl font-bold text-gray-900 text-center w-24 border-b-2 border-emerald-200 focus:border-emerald-600 focus:outline-none bg-transparent"
                  min={0}
                />
                <span className="text-xl text-gray-400 font-medium">kg</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setWeight(Math.max(0, weight - 1))}>
                - 1 kg
              </Button>
              <div className="flex-1 flex gap-1.5">
                {[1, 5, 10, 20].map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      weight === w
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => setWeight(weight + 1)}>
                + 1 kg
              </Button>
            </div>
          </Card>

          {/* AI placeholder */}
          <Card padding="md" className="mb-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">AI Value Estimate</span>
              <Badge variant="success" size="sm">Demo</Badge>
            </div>
            <p className="text-sm text-gray-600">
              Based on {material} at ~₹{material ? Math.round((materialMap[material].priceLow + materialMap[material].priceHigh) / 2) : 0}/kg, estimated value is approximately <span className="font-bold text-emerald-700">₹{estimatedValue.toLocaleString('en-IN')}</span>.
            </p>
          </Card>

          <Button fullWidth size="lg" disabled={weight <= 0} onClick={() => setStep(3)}>
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Step 3: Condition */}
      {step === 3 && (
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Item Condition</h3>
          <p className="text-sm text-gray-500 mb-4">What is the condition of your {material}?</p>
          <div className="flex flex-col gap-3">
            {conditions.map((c) => (
              <Card
                key={c}
                padding="md"
                onClick={() => setCondition(c)}
                className={`flex items-center gap-3 transition-all ${
                  condition === c
                    ? 'border-emerald-500 border-2 bg-emerald-50'
                    : 'hover:border-emerald-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    condition === c ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                  }`}
                >
                  {condition === c && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{c}</p>
                  <p className="text-xs text-gray-400">
                    {c === 'Good' && 'Clean, functional, minimal wear'}
                    {c === 'Used' && 'Used condition, some wear'}
                    {c === 'Damaged' && 'Broken or non-functional'}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-5">
            <Button
              fullWidth
              size="lg"
              disabled={!condition}
              onClick={() => setStep(4)}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 4 && (
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Estimated Value</h3>
          <p className="text-sm text-gray-500 mb-4">Review your lot details.</p>

          <Card padding="lg" className="mb-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Material</span>
                <Badge variant="success">{material}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-sm font-semibold text-gray-900">{weight} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Condition</span>
                <span className="text-sm font-semibold text-gray-900">{condition}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Avg. Rate</span>
                <span className="text-sm font-semibold text-gray-900">
                  ₹{material ? Math.round((materialMap[material].priceLow + materialMap[material].priceHigh) / 2) : 0}/kg
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700">Estimated Value</span>
                <span className="text-2xl font-bold text-emerald-600">
                  ₹{estimatedValue.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Final price depends on recycler quote and actual weight.
              </p>
            </div>
          </Card>

          <Button fullWidth size="lg" onClick={handleCreate}>
            <Package className="w-5 h-5" /> Create Lot
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
