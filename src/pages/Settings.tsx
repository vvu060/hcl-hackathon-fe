import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Building,
  Save,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
} from 'lucide-react';
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
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

export const Settings: React.FC = () => {
  const [hospitalName, setHospitalName] = useState('General Hospital');
  const [timeZone, setTimeZone] = useState('EST');
  const [shiftDuration, setShiftDuration] = useState('8');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [shiftReminders, setShiftReminders] = useState(true);
  const [overtimeAlerts, setOvertimeAlerts] = useState(true);

  const departments = [
    'Emergency Department',
    'Surgery Department',
    'ICU Department',
    'Cardiology Department',
    'Pediatrics Department',
  ];

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    // In a real app, this would save settings to the backend
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Updating password...');
    // In a real app, this would update the password
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // In a real app, this would export data
  };

  const handleImportData = () => {
    console.log('Importing data...');
    // In a real app, this would import data
  };

  const handleClearData = () => {
    console.log('Clearing all data...');
    setIsDeleteDialogOpen(false);
    // In a real app, this would clear all data
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
        <p className='text-muted-foreground'>
          Manage your application settings and preferences
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <SettingsIcon className='h-5 w-5' />
              General Settings
            </CardTitle>
            <CardDescription>
              Configure basic application settings
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='hospital-name'>Hospital Name</Label>
              <Input
                id='hospital-name'
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder='Enter hospital name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='timezone'>Time Zone</Label>
              <Select value={timeZone} onValueChange={setTimeZone}>
                <SelectTrigger>
                  <SelectValue placeholder='Select timezone' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='EST'>
                    Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value='CST'>
                    Central Standard Time (CST)
                  </SelectItem>
                  <SelectItem value='MST'>
                    Mountain Standard Time (MST)
                  </SelectItem>
                  <SelectItem value='PST'>
                    Pacific Standard Time (PST)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='shift-duration'>Default Shift Duration</Label>
              <Select value={shiftDuration} onValueChange={setShiftDuration}>
                <SelectTrigger>
                  <SelectValue placeholder='Select duration' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='8'>8 hours</SelectItem>
                  <SelectItem value='10'>10 hours</SelectItem>
                  <SelectItem value='12'>12 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='h-5 w-5' />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Email Notifications</Label>
                <p className='text-sm text-muted-foreground'>
                  Receive email alerts for schedule changes
                </p>
              </div>
              <input
                type='checkbox'
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>SMS Notifications</Label>
                <p className='text-sm text-muted-foreground'>
                  Receive text messages for urgent updates
                </p>
              </div>
              <input
                type='checkbox'
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Shift Reminders</Label>
                <p className='text-sm text-muted-foreground'>
                  Get reminders before shifts start
                </p>
              </div>
              <input
                type='checkbox'
                checked={shiftReminders}
                onChange={(e) => setShiftReminders(e.target.checked)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Overtime Alerts</Label>
                <p className='text-sm text-muted-foreground'>
                  Alert when staff approach overtime limits
                </p>
              </div>
              <input
                type='checkbox'
                checked={overtimeAlerts}
                onChange={(e) => setOvertimeAlerts(e.target.checked)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              Security Settings
            </CardTitle>
            <CardDescription>
              Update your password and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='current-password'>Current Password</Label>
              <Input
                id='current-password'
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder='Enter current password'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='new-password'>New Password</Label>
              <Input
                id='new-password'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter new password'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirm-password'>Confirm New Password</Label>
              <Input
                id='confirm-password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm new password'
              />
            </div>

            <Button
              onClick={handleUpdatePassword}
              className='w-full'
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              <Shield className='mr-2 h-4 w-4' />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Department Management */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Building className='h-5 w-5' />
              Department Management
            </CardTitle>
            <CardDescription>
              Manage hospital departments and their settings
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              {departments.map((department, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 border rounded-lg'
                >
                  <div className='flex items-center gap-3'>
                    <Badge variant='secondary'>{department}</Badge>
                  </div>
                  <Button variant='outline' size='sm'>
                    <Edit className='mr-2 h-4 w-4' />
                    Edit
                  </Button>
                </div>
              ))}
            </div>

            <Separator />

            <Button variant='outline' className='w-full'>
              <Plus className='mr-2 h-4 w-4' />
              Add New Department
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Import, export, or manage your application data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Button onClick={handleExportData} variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Export Data
            </Button>

            <Button onClick={handleImportData} variant='outline'>
              <Upload className='mr-2 h-4 w-4' />
              Import Data
            </Button>

            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant='destructive'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Clear All Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    all your data including staff records, schedules, and
                    settings.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex-col sm:flex-row gap-2'>
                  <Button
                    variant='outline'
                    onClick={() => setIsDeleteDialogOpen(false)}
                    className='w-full sm:w-auto'
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='destructive'
                    onClick={handleClearData}
                    className='w-full sm:w-auto'
                  >
                    Yes, clear all data
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className='flex justify-end'>
        <Button onClick={handleSaveSettings} size='lg'>
          <Save className='mr-2 h-4 w-4' />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
