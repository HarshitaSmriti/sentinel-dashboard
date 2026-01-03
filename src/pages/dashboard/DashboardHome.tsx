import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardStats, Transaction, TransactionType } from '@/lib/types';
import { dashboardApi, transactionsApi } from '@/lib/api';
import { generateMockTransaction } from '@/lib/mockData';
import KPICards from '@/components/dashboard/KPICards';
import TransactionFlowChart from '@/components/dashboard/TransactionFlowChart';
import FraudDistributionChart from '@/components/dashboard/FraudDistributionChart';
import TransactionTypeChart from '@/components/dashboard/TransactionTypeChart';
import RiskScoreHistogram from '@/components/dashboard/RiskScoreHistogram';
import LiveActivityFeed from '@/components/dashboard/LiveActivityFeed';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [statsRes, txRes] = await Promise.all([
          dashboardApi.getStats(),
          transactionsApi.getAll(),
        ]);
        
        if (statsRes.success && statsRes.data) setStats(statsRes.data);
        if (txRes.success && txRes.data) setTransactions(txRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Real-time updates - add new transactions periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newTx = generateMockTransaction();
      setTransactions(prev => [newTx, ...prev.slice(0, 49)]);
      
      // Update stats
      setStats(prev => prev ? {
        ...prev,
        totalTransactions: prev.totalTransactions + 1,
        flaggedTransactions: newTx.status === 'flagged' ? prev.flaggedTransactions + 1 : prev.flaggedTransactions,
        totalVolume: prev.totalVolume + newTx.amount,
      } : prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calculate derived data for charts
  const transactionFlowData = useCallback(() => {
    const hourlyData: { time: string; count: number; flagged: number }[] = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourStr = hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const txInHour = transactions.filter(tx => {
        const txDate = new Date(tx.timestamp);
        return txDate.getHours() === hour.getHours();
      });
      
      hourlyData.push({
        time: hourStr,
        count: Math.max(txInHour.length, Math.floor(Math.random() * 50 + 20)),
        flagged: Math.floor(Math.random() * 5),
      });
    }
    
    return hourlyData;
  }, [transactions]);

  const fraudDistributionData = useCallback(() => {
    const flagged = transactions.filter(tx => tx.status === 'flagged').length;
    const nonFlagged = transactions.length - flagged;
    return [
      { name: 'Legitimate', value: nonFlagged, fill: 'hsl(var(--success))' },
      { name: 'Flagged', value: flagged, fill: 'hsl(var(--danger))' },
    ];
  }, [transactions]);

  const transactionTypeData = useCallback(() => {
    const typeCount: Record<TransactionType, number> = {
      PAYMENT: 0,
      TRANSFER: 0,
      CASH_OUT: 0,
      CASH_IN: 0,
      DEBIT: 0,
    };
    
    transactions.forEach(tx => {
      typeCount[tx.type]++;
    });
    
    return [
      { name: 'Payment', value: typeCount.PAYMENT, fill: 'hsl(var(--accent))' },
      { name: 'Transfer', value: typeCount.TRANSFER, fill: 'hsl(var(--warning))' },
      { name: 'Cash Out', value: typeCount.CASH_OUT, fill: 'hsl(var(--danger))' },
      { name: 'Cash In', value: typeCount.CASH_IN, fill: 'hsl(var(--success))' },
    ];
  }, [transactions]);

  const riskScoreData = useCallback(() => {
    // Simulated risk score distribution
    return [
      { range: '0-20', count: Math.floor(Math.random() * 100 + 150), fill: 'hsl(var(--success))' },
      { range: '20-40', count: Math.floor(Math.random() * 80 + 80), fill: 'hsl(152, 60%, 50%)' },
      { range: '40-60', count: Math.floor(Math.random() * 50 + 40), fill: 'hsl(var(--warning))' },
      { range: '60-80', count: Math.floor(Math.random() * 30 + 20), fill: 'hsl(30, 80%, 50%)' },
      { range: '80-100', count: Math.floor(Math.random() * 15 + 10), fill: 'hsl(var(--danger))' },
    ];
  }, []);

  const handleSelectTransaction = (tx: Transaction) => {
    navigate(`/dashboard/results?id=${tx.id}`);
  };

  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <KPICards stats={stats} isLoading={isLoading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Flow Chart */}
        <TransactionFlowChart data={transactionFlowData()} isLoading={isLoading} />

        {/* Fraud Distribution Chart */}
        <FraudDistributionChart data={fraudDistributionData()} isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Type Breakdown */}
        <TransactionTypeChart data={transactionTypeData()} isLoading={isLoading} />

        {/* Risk Score Histogram */}
        <RiskScoreHistogram data={riskScoreData()} isLoading={isLoading} />
      </div>

      {/* Live Activity Feed */}
      <LiveActivityFeed 
        transactions={transactions.slice(0, 10)} 
        isLoading={isLoading}
        onSelect={handleSelectTransaction}
      />
    </div>
  );
};

export default DashboardHome;
