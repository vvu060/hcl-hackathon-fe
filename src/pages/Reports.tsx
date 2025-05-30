import React, { useState } from 'react';
import { Download, Calendar, BarChart3, Users, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';

export const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerateReport = () => {
    console.log('Generating report:', { reportType, startDate, endDate });
    // In a real app, this would generate and download the report
  };

  const handleDownloadReport = (reportName: string) => {
    console.log('Downloading report:', reportName);
    // In a real app, this would download the specific report
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Reports</h1>
        <p className='text-muted-foreground'>
          View and generate staff and scheduling reports
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Average Hours/Week
            </CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>42.5</div>
            <p className='text-xs text-muted-foreground'>
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Attendance Rate
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>96.8%</div>
            <p className='text-xs text-muted-foreground'>
              +0.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Coverage Rate</CardTitle>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>98.5%</div>
            <p className='text-xs text-muted-foreground'>
              +1.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Open Shifts</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>3</div>
            <p className='text-xs text-muted-foreground'>-2 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Generate Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>
              Create custom reports for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='report-type'>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select report type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='staff-hours'>
                    Staff Hours Report
                  </SelectItem>
                  <SelectItem value='attendance'>Attendance Report</SelectItem>
                  <SelectItem value='overtime'>Overtime Report</SelectItem>
                  <SelectItem value='schedule-coverage'>
                    Schedule Coverage
                  </SelectItem>
                  <SelectItem value='department-summary'>
                    Department Summary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='start-date'>Start Date</Label>
                <Input
                  id='start-date'
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='end-date'>End Date</Label>
                <Input
                  id='end-date'
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleGenerateReport}
              className='w-full'
              disabled={!reportType || !startDate || !endDate}
            >
              <BarChart3 className='mr-2 h-4 w-4' />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Download previously generated reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {[
                {
                  name: 'Monthly Staff Hours',
                  date: 'Dec 1, 2024',
                  type: 'staff-hours',
                },
                {
                  name: 'Attendance Summary',
                  date: 'Nov 28, 2024',
                  type: 'attendance',
                },
                {
                  name: 'Overtime Report',
                  date: 'Nov 25, 2024',
                  type: 'overtime',
                },
              ].map((report, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 border rounded-lg'
                >
                  <div className='space-y-1'>
                    <p className='font-medium'>{report.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      Generated on {report.date}
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleDownloadReport(report.name)}
                  >
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule Overview</CardTitle>
          <CardDescription>
            Staff allocation across departments and days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Monday</TableHead>
                  <TableHead>Tuesday</TableHead>
                  <TableHead>Wednesday</TableHead>
                  <TableHead>Thursday</TableHead>
                  <TableHead>Friday</TableHead>
                  <TableHead>Weekend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className='font-medium'>Emergency</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>8 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>8 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>8 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>8 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>8 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>6 staff</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>Surgery</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>6 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>6 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>5 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>6 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>4 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>2 staff</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>ICU</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>5 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>5 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>5 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>5 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>5 staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>4 staff</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
