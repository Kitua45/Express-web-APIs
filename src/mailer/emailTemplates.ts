export const emailTemplate = {
    welcome: (firstName: string) => `
    <div>
        <h2>Welcome ${firstName}!</h2>
        <p>Thank you for registering with our Todo App. We're excited to have you on board!</p>
        <P>You can now log in and start managing your tasks efficiently.</P>
    </div>
    `,
  
    verify: (firstName: string, code: string) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello ${firstName}!</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>Please enter this code in the app to verify your email address.</p>
        <br />
        <p> Thank you,<br/>The Todo App Team</p>
    </div>
    `,
  
    verifiedSuccess: (firstName: string) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${firstName},</h2>
      <p> Your account has been verified successfully!</p>
      <p>You can now log in and start using all features.</p>
      <br/>
      <p> Thank you,<br/>The Todo App Team</p>
    </div>
    `
};