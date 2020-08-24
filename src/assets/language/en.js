const en = {
  home:{
    welcome:"Welcome",
    byone:" Byone Wallet",
    create:"Create",
    createHint:"Creat a new wallet to save and transfer your assets.",
    import:"Import",
    importHint:"If you already have a wallet, you can import it."
  },
  common:{
    veto: 'Veto',
    cross_chain_in: 'Cross In Vapor',
    spend : 'Spend ',
    coinbase: 'Coinbase',
    control : 'Received ',
    cross_chain_out: 'Cross Out Vapor',
    vote: 'Vote',
    transfer:'Transfer',
    issue:'Issue',
    retire:'Retire',
    transfer_in:'Receive',
    transfer_out:'Send',
    cross_chain:'Cross Chain',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  welcome: {
    enterMain:"Enter Main View",
    title: 'Welcome to the BYTOM Chrome Wallet',
    use: 'Start',
    term: 'I agree with {0} and {1}',
    confirm: 'I agree',
    cancel: 'Cancel',
    register: 'Register',
    restore: 'Restore',
  },
  restore:{
    title:'Import Wallet',
    mnemonic:'Mnemonic',
    kFile:'Keystore File',
    kFHint:'Backup to upload',
    kText:'Keystore Text',
    kSHint:'Please enter Keystore text',
    sPassword:'Setup password',
    vPassword:'Verify password',
    passwordHint:'Keep the password in mind. Transactions, backups, and other operations need to verify the password',
    p1text:'Please set up password',
    p2text:'Please repeat your password'
  },
  dialog: {
    header: 'Warning',
    copy: {
      success: 'Copied！',
      fail: 'Copy failed！'
    }
  },
  transfer: {
    address: 'Address',
    quantity: 'Amount',
    fee: 'Fee',
    feeType: 'Standard',
    send: 'Send transaction',
    confirmPassword: 'password',
    confirm: 'Confirm',
    cancel: 'Cancel',
    emptyPassword: 'Password can not be empty.',
    unit: 'unit',
    asset:'Asset',
    assetId: 'Asset Id',
    emptyTo: 'Empty address',
    noneBTM: 'Error BTM Amount',
    transferAmount: 'Amount',
    transferCost: 'Transfer Cost',
    total: 'Total',
    totalTip: 'Transfer Amount+Fee',
    success: 'Transaction sent successfully',
    confirmTransaction:'Confirm Transaction',
    from:'From',
    to:'To',
    view:'View',
    hide:'Hide',
    viewAll:'View All',
    hideAll:'Hide All',
    types:'Types',
    password:'Please Enter the password',
    detail:'Transaction Detail',
    requestDetail:'Request Detail',
    amount:'Transaction Amount',
    signComfirm:'Sign Transaction',
    signMessage:'Sign Message'
  },
  listAsset: {
    all:'All',
    fail:'Failed'
  },
  crossChain:{
    title:'Cross Chain',
    detail:'Cross Chain Details',
    amountPlaceHolder:" available amount: ",
    amountHint:'Cross Chain Transaction will be completed in 24 hrs.',
    toVapor:'Transfer to \n Vapor Chain',
    toBytom:'Transfer to \n Bytom Chain',
    asset:'Select Asset',
    direction:'Cross Direction'
  },
  listVote:{
    title:'Block Producer Voting',
    myVote:'My votes',
    totalVote:'All votes',
    voteRecord:'Voting History',
    voteRules:'Voting Rules',
    cancelVote:'Veto',
    bp:'BP',
    standbyBP:'Standby BP',
    bpName:'BP name',
    bpPubkey:'BP Public Key',
    vote:'Vote',
    votes:'Votes',
    voteVotes:'Votes',
    voteAccount:'Vote Account',
    vetoAccount:'Veto Account'
  },
  listCancel:{
    voted:'Voted',
    cancel:'Cancel',
    selectVote:'Choose to vote',
    availableVeto:'Available veto amount'
  },
  vote:{
    selectNode:'Select Node',
    voteDetials:'Vote Details',
    vetoDetials:'Veto Details',
    confirmVote:'Confirm Vote',
    confirmVeto:'Confirm Veto',
    amountPlaceHolder:"available amount: "
  },
  signMessage:{
    title:'Request Signature',
    address: 'Sign Address',
    message:'Sign Message',
    confirmSignature:'Sign'
  },
  enable:{
    title:'Connect Request',
    domain: 'Domain:',
    message: ' is trying to connect to your byone and use the relevant API request, please make sure the site is secure. Would you like to connect?',
    cancel:'Cancel',
    confirm:'Connect'
  },
  disable:{
    title:'Disable Request',
    domain: 'Domain',
    message: 'would like to diable your connection',
    cancel:'Cancel',
    confirm:'Disable'
  },
  receive:{
    address: 'Address',
    tips:'Tips: Click address to copy directly.',
    vpWarning:'Please don\'t use Vapor address in the real transaction.'
  },
  main: {
    mainnet: 'Mainnet',
    testnet: 'Testnet',
    vapor: 'Vapor',
    bytom: 'Bytom',
    solonet: 'Solonet',
    mainNetShort: 'Mainnet',
    testNetShort: 'Testnet',
    vaporTestNetShort: 'Vapor Testnet',
    soloNetShort: 'Solonet',
    copy: 'Click to copy',
    send: 'Send',
    receive: 'Receive',
    vote:'Vote',
    crossChain:'Cross',
    record: 'Transaction Record',
    asset:'Asset',
    noAccount: 'No account information on this network.',
    create: 'Create account',
    noRecord:"No transaction records found.",
    noAssetRecord:"No asset records found.",
    unconfirmed :'Unconfirmed',
    network:'Network',
    totalAsset:'Total Asset'
  },
  asset:{
    title:'Asset'
  },
  transactionDetail: {
    title: 'Transaction Detail',
    fee: 'Fee',
    time:'Time',
    blockHeight: 'Block Height',
    blockSize: 'Block Size',
    transactionID: 'Tx Id',
    sendAddress: 'Send Address',
    receiveAddress: 'Receive Address',
    myAddress: '(My Address)',
    success:'The transaction is succeed',
    fail:'The transaction is Failed.',
    pending:'The transaction is pending…',
    tips:'Tip: Visit Blockmeta.com to check more information. ',
    assetId:'Asset Id'
  },
  menu: {
    title: 'Switch Account',
    createAccount: 'Create Account',
    backup: 'Backup',
    help: 'Help',
    setting: 'Setting'
  },
  createAccount: {
    title: 'Create A Wallet',
    walletName:'Please enter wallet\'s name',
    password:'Please enter your password',
    confirmPassword: 'Please repeat your password',

    accountAlias: 'Account Alias',
    keyAlias: 'Key Alias',
    keyPassword: 'Key Password',
    create: 'Create an account',
    select: 'Select network',
    file: 'Backup file',
    import: 'Import from backup',
    back: 'Back',
    passwordAgain:
      'The passwords are inconsistent twice. Please check and try again.',
    inputAlias: 'Please enter the account alias.',
    inputKey: 'Please enter the key alias.',
    inputPass: 'Please enter your password.',
    agreeService:'Please read and agree the service term.'
  },
  mnemonic:{
    "title":"Backup Mnemonic",
    "hint":"Please keep the mnemonic, your asset will lost once it lost!",
    "passwordHint":"Please enter the password to display mnemonic"
  },
  verifyMnemonic:{
    "title":"Verify Mnemonic",
  },
  error:{
    BTM0000: 'This field is required.',
    BTM0001:'Please enter mnemonic.',
    BTM0002:'Mnemonic verification failed, Please enter the correct Mnemonic.',
    BTM0003:'Please choose the Keystore file.',
    BTM0004:'Please enter Keystore.',
    BTM0005:'Insufficient balance.',
    BTM0006:'Address format error',
    BTM0007:'Wallet name error',
    BTM0008:'Empty password',
    BTM0009:'Current wallet is already an account'
  },
  successMsg:{
    createWallet:{
      header: 'Create successfully',
      description:'Please save your mnemonic, Enjoy it!'
    },
    restoreWallet:{
      header: 'Import successfully',
      description:'Please save your Keystore file and password,Enjoy it!'
    },
    transaction:{
      header: 'Confirm successfully',
      description:'Transfer successfully, Enjoy it!'
    }
  },
  wallet:{
    create:"Create wallet",
    success:'Switch account successfully'
  },
  help: {
    title: 'Help',
    page: 'Info'
  },
  setting: {
    lang: 'Language',
    currency:'Currency',
    enLange:"Expand view",
    deleteWallet:'Delete wallet',
    deleteHint:'Please confirm you has backed up your wallet.',
    deleteBack:'Return',
    deleteConfirm:'Confirm',
    deleteConfirmHint:'Please enter the wallet name.',
    emptyWallet:'Empty wallet name'
  },
  backup: {
    title: 'Backup',
    button: 'Backup',
    mnemonic:'Back up mnemonic',
    keystore:'Back up keystore',
    mnemonicHint:'Please copy the mnemonic and keep it.',
    ok:'Completed'
  },
  protocol: {
    title: 'Service Agreement',
    content:`Dear users:
    Thank you for choosing Bytom Chrome Wallet. This“Bytom Chrome Wallet Terms of Service”(“Agreement”) is made between you (“User”) and Chainboat Technology Ltd. (Company Registration Number: 1963344), a company incorporated in The British Virgin Islands (BVI) (“Company”) and is legally binding between you and Company. In this Agreement (a) “we” and “us” refer to the Company and “our” shall be construed accordingly; and (b) “you” refers to User and “your” shall be construed accordingly. Each of you and the Company shall hereinafter be referred to as a “Party”, and collectively, you and the Company shall hereinafter be referred to as the “Parties”.

    Company hereby reminds you that you must carefully read the full content of this Agreement and other documents mentioned in this Agreement before using our Bytom Chrome Wallet（You can use Bytom Chrome Wallet by chrome browser Plug-in to obtain related services）. In particular, you must carefully read the section of “Disclaimer and Limitation of Liability” and other sections which are displayed in bold in this Agreement. You must make sure that you fully understand the whole Agreement and evaluate the risks of using Bytom MOV on your own.


    I. confirmation and acceptance of this agreement
    1. You understand that this agreement and related agreements are applicable to decentralized applications (" DApp ") developed and owned by Chainboat on Bytom Chrome Wallet and future Bytom Chrome Wallet (excluding DApp developed by third parties).
    2. If you download the Bytom Chrome Wallet software and create or import the wallet, you will be deemed to have fully read and accepted all the terms of this agreement. This agreement takes effect immediately and is binding on both parties.
    3. This agreement can be updated at any time by Chainboat. Once the revised agreement is announced on Bytom Chrome Wallet, it will take effect automatically without further notice. After Chainboat publishes the terms of the modified agreement, if you do not accept the revised terms, please immediately stop using Bytom Chrome Wallet. Your continued use of Bytom Chrome Wallet will be deemed to accept the modified agreement.
    4. If you are under the age of 18, or have no or limited capacity for civil conduct, please use Bytom Chrome Wallet under the guidance of your parents or guardians.
    Second, the definition of 
    1. Bytom Chrome Wallet: refers to the blockchain wallet developed by Chainboat based on Bytom (and other public chains to be supported in the future), including other auxiliary tools developed to facilitate users to use blockchain system.
    2. User:
    (1) the user must be a natural person with full capacity for civil conduct;
    (2) if you use Bytom Chrome Wallet service for minors under the age of 18, you need to use Bytom Chrome Wallet under the guidance of your parents or guardians. If a person without capacity for civil conduct USES Bytom Chrome Wallet or limits his capacity for civil conduct to conduct transactions beyond the scope of his civil rights or capacity, Bytom Chrome Wallet shall have the right to hold you and your parents or guardian accountable for all the consequences caused.
    3. Creating or importing a wallet: means that you use Bytom Chrome Wallet to confirm the fulfillment of this agreement and to create or import a wallet.
    4. Wallet password: during the process of creating Bytom Chrome Wallet wallet, the software operation interface prompts you to fill in the password, which is used for encryption to protect the private key. As a decentralized application, the wallet password is not stored on your PC device or the server of the Chainboat, and once lost you need to reset the new password with the plaintext private key or mnemonic.
    5. Information prompt: the information prompt content involved in the operating interface of Bytom Chrome Wallet software is recommended to users to follow the relevant steps.
    6. Specific user: refers to the user who must cooperate with Chainboat to fulfill the personal information disclosure obligation in accordance with Chinese laws, regulations and policies.
    7. Private key: composed of 256-bit random characters, it is the core of the digital assets that the user owns and USES.
    8. Public key: the private key is generated through one-way derivation based on cryptography principle and used to generate the blockchain digital wallet address. The digital wallet address is the public deposit address.
    9. Mnemonic : they conform to the industry standard of blockchain BIP39 and consist of 12 (or 15/18/21/24) ordered words generated by random algorithm. It is a form of easy record of private key, convenient for users to backup and keep.
    10. Keystore: is a file form where the private key or mnemonic word is encrypted and saved through the wallet password set by the user. It is stored only on your PC device and will not be synchronized to the Chainboat server.
    11. Digital assets: refers to the types of digital assets that Bytom Chrome Wallet currently supports, including but not limited to BTM.
    12. Personal information: refers to records in electronic or any other way to separate or combined with other information to identify the user personal identity of all kinds of information, including but not limited to natural person's name, date of birth, id number, personal biometric information, address, telephone number, bank card number, E-mail address, wallet, PC devices, information, operation records, trading records, etc., but does not include a user's password wallet, private keys,  mnemonic, Keystore.
    Iii. Service contents
    1.Create or import a wallet. For digital assets backed by Bytom Chrome Wallet, you can use Bytom Chrome Wallet to generate new wallets or compatible wallets generated by other wallet tools imported into the relevant blockchain system.
    2. Deposit and withdrawal. You can use Bytom Chrome Wallet's deposit and withdrawal functions to manage digital assets. That is to say, you can use the private key for electronic signature and modify the account books of relevant blockchain. Transfer refers to that the payer USES the recipient's block chain address to transfer the asset, and the actual deposit and withdrawal behaviors all occur in the relevant blockchain system (instead of Bytom Chrome Wallet).
    3. Manage digital assets. You can use Bytom Chrome Wallet to add, store, and remove digital tokens supported by Bytom Chrome Wallet (except BTM).
    4. Browse DApp. Users can jump to and use the service provided by the DApp (including CoinEra's own DApp and third-party DApp) through a link on Bytom Chrome Wallet.
    5. transaction records. We will copy all or part of your transaction records through the blockchain system. But transaction records are based on blockchain system records.
    6. Service suspension. You are aware of the "irrevocable" property of transactions based on the blockchain system. We cannot suspend or revoke transaction and other operations for you, but under certain circumstances, we can suspend or restrict the operation of Bytom Chrome Wallet software by a certain user.
    7. Other services that Chainboat deems necessary.
    Users should be aware of the following common problems when accepting the above services provided by Chainboat:
    1. Adhering to the decentralization of blockchain and in order to protect the security of users' digital assets, Chainboat provides decentralized services, which is greatly different from banking financial institutions. Users understand that Chainboat does not provide the following services:
    (1) store the user's wallet password (i.e. the password set by the user when creating/importing the wallet), private key, mnemonic word and Keystore;
    (2) retrieve the user's wallet password, private key, mnemonic word and Keystore;
    (3) frozen wallet;
    (4) report the loss of the wallet;
    (5) transaction rollback;
    (6) restore the wallet.
    2. Since Chainboat does not provide the above services, users should keep PC devices containing Bytom Chrome Wallet, backup Bytom Chrome Wallet, backup wallet password, mnemonic, private key and Keystore by themselves. If the user loses the PC device, deletes and does not back up Bytom Chrome Wallet, deletes and does not back up the wallet, the wallet is stolen or forgotten the wallet password, private key, mnemonic word, and Keystore, Chainboat cannot restore or recover the wallet password, private key, mnemonic word, and Keystore. If a user makes a transaction by mistake (such as sending a wrong address), Chainboat cannot cancel the transaction.
    3. The digital token management services provided by Chainboat and Bytom Chrome Wallet do not include all existing digital assets. Do not operate any digital token not supported by Bytom Chrome Wallet through Bytom Chrome Wallet.
    4. Bytom Chrome Wallet is only a digital token management tool for users, not an exchange or trading platform. Although this agreement will refer to "transaction" several times, it generally refers to users' deposit and withdrawal operations using Bytom Chrome Wallet, which is fundamentally different from "transaction" on an exchange or trading platform.
    5. The integrated DApp on Bytom Chrome Wallet includes the independent DApp owned by Chainboat and the DApp provided by the third party platform. For DApp provided by third-party platforms, Bytom Chrome Wallet only provides blockchain explorer for users to enter DApp. Users should make their own judgment and assessment before accepting services or conducting transactions on third-party DApp, and whether the services or transactions provided by such third-party DApp are at risk.
    Iv. Your rights and obligations
    Create or import a wallet
    1. Create or import a wallet: you have the right to create and/or import a wallet via Bytom Chrome Wallet on your PC device, set the wallet password and other information, and use your own wallet to transfer and receive transactions on the blockchain through Bytom Chrome Wallet app.
    2. Authentication: according to relevant laws, regulations and policies, when using the relevant services provided by Bytom Chrome Wallet, specific users shall timely complete relevant authentication in accordance with Bytom Chrome Wallet's prompts, requiring you to submit personal information including but not limited to your name, id number, PC number, bank card number and so on. Otherwise, this particular user will not be able to use the service, and you will be responsible for the loss caused by the delay of this particular user.
    3. Chainboat may be developing different versions of software for different end devices, and you should choose to download the appropriate version for installation based on actual needs. If you obtain the software or an installer with the same name of the software from an unauthorized third party, Chainboat will not guarantee the normal use of the software or its security, and you shall bear the losses caused thereby.
    4. After the new version of the software is released, the old version of the software may not be available. Chainboat does not guarantee the security, continued availability, or customer service of older software. Please check and download the latest version at any time.
    (2) use
    1. Users shall properly keep PC devices, wallet passwords, private keys, mnemonic words, Keystore and other information. Chainboat is not responsible for keeping the above information for the user. All risks, responsibilities, losses and expenses arising from the loss of your PC device, active or passive disclosure, forgotten wallet password, private key, mnemonic word, Keystore or attack or fraud by others shall be borne by you.
    Follow information tips. You understand and agree to follow the information prompts made by Bytom Chrome Wallet to you and operate according to the content of the information prompts. Otherwise, all risks, liabilities, losses and costs caused thereby shall be borne by you.
    3. You understand and understand that Bytom Chrome Wallet has no obligation to perform due diligence on linked third-party DApp services or transactions, and you should make investment decisions rationally and independently assume corresponding investment risks.
    4. Complete authentication actively. When Bytom Chrome Wallet reasonably believes that your transaction behavior or transaction situation is abnormal, or that your identity information is questionable, or Bytom Chrome Wallet thinks that your identity document or other necessary documents should be checked, please actively cooperate with Bytom Chrome Wallet to check your valid identity document or other necessary documents and timely complete relevant authentication.
    5. Transfer.
    (1) you are aware that the daily account transfer limit and amount you can use in Bytom Chrome Wallet service may be different for the country/region you are in when using the transfer service, regulatory requirements, transfer purpose, risk control of Bytom Chrome Wallet, identity verification and other reasons.
    (2) you understand the "irrevocable" property based on the blockchain operation. When you use the Bytom Chrome Wallet transfer function, you should bear the consequences caused by your operation error (including but not limited to the problem of your wrong transfer address and your own choice of transfer node server).
    (3) you are aware that when using Bytom Chrome Wallet service, the following situations may lead to the transfer "transaction failure" or "package timeout" :
    A) insufficient wallet balance;
    B) the transaction gas is insufficient;
    C) blockchain fails to execute the contract code;
    D) exceeding the amount of payment required by regulatory authorities, Bytom Chrome Wallet or laws and regulations;
    E) network, equipment, and other technical failures;
    F) transaction is abandoned due to blockchain network congestion, failure, and other reasons;
    G) your address or the address of the counterparty of the transaction is recognized as a special address, such as high-risk address, exchange address, ICO address, Token address, etc.
    (4) you know that Bytom Chrome Wallet only provides you with the transfer tool. After you use Bytom Chrome Wallet to complete the transfer, Chainboat will complete all obligations of the service.
    6. Legal compliance. You know that you should comply with relevant laws, regulations and national policies when operating Bytom Chrome Wallet or making transactions with DApp on Bytom Chrome Wallet.
    7. Notice. Bytom Chrome Wallet will send you notices by website announcement, email, sending SMS, phone, message center information, pop-up prompt or client notification, etc., such as informing you of the progress of the transaction or prompting you to perform relevant operations. Please pay attention to it in a timely manner.
    8. Service fees and tax obligations:
    (1) Bytom Chrome Wallet will not charge you any service fee or service fee for the time being. The rules will be separately agreed or announced when charging for certain services in the future;
    (2) when you use Bytom Chrome Wallet to transfer money, you should pay the gas . The amount is up to you. Gas  is collected by the relevant blockchain system;
    (3) you are aware that under certain circumstances, if your transfer operation is not completed due to unstable environment and network status, the gas will be charged by the relevant blockchain system;
    (4) you shall be responsible for all taxes payable and other expenses incurred in connection with your transaction in Bytom Chrome Wallet.
    Risk warning
    1. You understand and understand that, as the laws, regulations and policies in the field of digital tokens are not yet sound, the digital tokens in this field may generate significant risks such as uncashing and technical instability. And the price of digital tokens fluctuates much more than other financial assets. We caution that you should rationally choose to hold or dispose of any digital token according to your financial situation and risk preference. The ticker view feature provided by Bytom Chrome Wallet is only a search result that captures the exchange rate information of digital tokens from some exchanges, and does not represent the latest quotation or the best offer.
    2. When using Bytom Chrome Wallet service, if you or your counterpart fails to comply with this agreement or the operation tips and rules in the description, transaction and payment pages of relevant websites, Bytom Chrome Wallet does not guarantee the fair to be completed smoothly, and Bytom Chrome Wallet does not bear the liability for damages. If the foregoing happens and the payment has been entered into the account of your or your counterparty's Bytom Chrome Wallet wallet or third-party wallet, you understand the "irreversible" property of the blockchain operation and the "irrevocable" feature of the relevant transaction，You and your counterpart shall bear the corresponding consequences at their own risk.
    3. You shall determine whether the other party is a person with full capacity for civil conduct and decide whether to transact with the other party or transfer money to the other party at your own risk.
    4. In the process of transfer, if "transaction failure", "package timeout" and other similar abnormal information prompts occur, you should reconfirm through the official channel of relevant blockchain system or other blockchain query tools to avoid repeated transfer; Otherwise, all losses and expenses arising therefrom shall be borne by you.
    5. You understand that after you create or import wallet on Bytom Chrome Wallet, your Keystore, private key, mnemonic and other information are only stored in the current PC device, not on the server of Bytom Chrome Wallet or Chainboat. You can replace PC devices by synchronizing wallets and other means according to the operation guide provided by Bytom Chrome Wallet. However, if you do not save or backup the wallet password, private key, mnemonic word, Keystore and other information, and if your PC device is lost, your digital token will be lost, and Chainboat cannot retrieve it for you, you shall bear the corresponding loss by yourself. If you export, save or backup the wallet password, private key, mnemonic word, Keystore and other information, or the device or server that saves or backs up the above information is attacked or controlled by hackers, your digital token will be lost, and Chainboat cannot retrieve it for you, you shall bear the corresponding loss by yourself.
    6. We recommend that you make a safe backup of your wallet password, private key, mnemonic word, Keystore and other information when creating or importing your wallet. We draw your attention, please do not use the following backup: screenshot, email, notepad, SMS, WeChat, QQ and other electronic backup. We recommend that you copy mnemonic and Keystore information in a paper notepad. You can also store electronic data in the password manager.
    7. We suggest that you use Bytom Chrome Wallet in a secure network environment to ensure that your PC device does not jailbreak or Root to avoid potential security risks
    8. Please be aware of non-Bytom Chrome Wallet official fraud when using our service. We encourage you to inform us as soon as such behavior is discovered.
    Vi. Change, interruption and termination of the service
    1. You agree that Chainboat may temporarily provide some service functions or suspend some service functions or open new service functions in the future to guarantee the independent business operation right. When any function is reduced or added or changed, as long as you still use the services provided by Chainboat, you still agree to this agreement or the amended terms hereof.
    2. To protect your digital assets safe, try to avoid you don't have block chain under the premise of basic knowledge of using Bytom Chrome Wallet wrong operation or the resulting risks, you must first achieve Chainboat through ability assessment questionnaire and the required passing score can use Bytom Chrome Wallet service, otherwise, Chainboat reserves the right to limit or refused to provide part or all of the services.
    3. You understand that Chainboat will suspend service when:
    (1) interruption of business due to technical reasons such as maintenance, upgrade, failure and communication interruption of equipment and blockchain system;
    (2) due to force majeure factors such as typhoon, earthquake, tsunami, flood, power failure, war or terrorist attack, virus, Trojan horse, hacker attack, system instability or government action, Chainboat system cannot provide services or Chainboat reasonably believes that there will be a greater risk of continuing to provide services;
    (3) other circumstances beyond Chainboat's control or reasonably foreseeable occur.
    3. When the following situations occur to you, Chainboat can unilaterally suspend or terminate some or all functions of Bytom Chrome Wallet that you use:
    (1) user death;
    (2) stealing other people's wallet information or PC devices;
    (3) providing false information when filling in personal information and not operating by myself when answering the competency assessment questionnaire;
    (4) reject the mandatory update operation initiated by Chainboat to improve Bytom Chrome Wallet function;
    (5) use Bytom Chrome Wallet for illegal or criminal activities;
    (6) hindering the normal use of other users;
    (7) employees or managers falsely claiming to be Chainboat;
    (8) attack, invade, alter or otherwise threaten the normal operation of the Chainboat computer system;
    (9) use Bytom Chrome Wallet to promote junk advertisements;
    (10) spread rumors to damage the goodwill of Chainboat and Bytom Chrome Wallet;
    (11) illegal ACTS, other ACTS in violation of this agreement, and circumstances in which Chainboat reasonably believes that its functions should be suspended.
    4. When the service relationship between you and Chainboat changes, breaks or terminates, you still have the right to export your wallet and other information within a reasonable time.
    7. Your legal commitment to use the Chainboat service
    1. You shall abide by the relevant laws and regulations of the People's Republic of China and the laws and regulations of the country or region where you live. Bytom Chrome Wallet shall not be used for any illegal purpose or in any illegal way to use Chainboat services.
    2. You are not allowed to use Bytom Chrome Wallet to engage in illegal or criminal activities, including but not limited to:
    (1) to oppose the basic principles set forth in the constitution, endanger national security, divulge state secrets, subvert state power or undermine national unity;
    (2) engage in any illegal and criminal ACTS, including but not limited to money laundering, illegal fund-raising, etc.;
    (3) by using any automated programs, software, engines, web crawlers, web analytics tools, data mining tools or similar tools to access the Chainboat service, collect or process the content provided by Chainboat, or attempt to interfere with any user's or any other access to the Chainboat service;
    (4) provide gambling information or in any way induce others to participate in gambling;
    (5) hack into others' Bytom Chrome Wallet wallet to steal digital tokens;
    (6) conducting transactions inconsistent with the transactions claimed by the other party, or untrue transactions;
    (7) engage in any behavior that infringes or may infringe Bytom Chrome Wallet service system and data;
    (8) other illegal ACTS and ACTS that Chainboat may reasonably consider inappropriate.
    3. You understand and agree that if Chainboat suffers any loss, claim from any third party or penalty imposed by any administrative authority due to your violation of relevant laws (including but not limited to customs and tax regulations) or provisions of this agreement, you shall indemnify Chainboat, including reasonable attorney fees.
    4. You agree to pay the service fee of Chainboat on time (if any), otherwise Chainboat has the right to suspend or suspend the service provided to you.
    Viii. Privacy policy
    1. Chainboat attaches great importance to the protection of users' privacy. For relevant privacy protection policies, please refer to the Bytom Chrome Wallet privacy policy published and updated from time to time by Chainboat.
    Ix. Disclaimer and limitation of liability
    1. Chainboat is only liable for the obligations set forth in this agreement.
    2. You understand and agree that, to the extent permitted by law, Chainboat can only provide services in accordance with the existing technical level and conditions. As a result, Bytom Chrome Wallet could not provide services normally for the following reasons, and Chainboat was not responsible:
    (1) Bytom Chrome Wallet system is down for maintenance or upgrade;
    (2) force majeure such as typhoon, earthquake, flood, lightning or terrorist attack;
    (3) failure of your PC device's hardware and software, communication lines and power supply lines;
    (4) you use the services of Chainboat improperly or without authorization or approval of Chainboat;
    (5) due to viruses, Trojan horses, malicious program attacks, network congestion, system instability, system or equipment failure, communication failure, power failure, Banks and other reasons or government actions;
    (6) any other reason not caused by Chainboat.
    3. Chainboat is not liable for:
    (1) loss of digital tokens caused by users' loss of PC devices, deletion and failure to back up Bytom Chrome Wallet, deletion and failure to back up wallet, wallet theft or forgetting wallet password, private key, mnemonic word and Keystore;
    (2) loss of digital tokens caused by users' disclosure of wallet password, private key, mnemonic word and Keystore, or borrowing, transferring or authorizing others to use their PC devices or Bytom Chrome Wallet wallet, or not downloading Bytom Chrome Wallet application through Chainboat official channel or using Bytom Chrome Wallet application in other unsafe ways;
    (3) loss of digital assets caused by user's wrong operation (including but not limited to the wrong transfer address you input and the server of transfer node you choose);
    (4) due to time delay, instability of blockchain system and other reasons, transaction records of Chainboat copy users on blockchain are deviated;
    (5) loss of digital assets due to misoperation by users who do not understand the nature of blockchain technology;
    (6) risks and consequences arising from users' operation on third-party DApp.
    4. You understand that Bytom Chrome Wallet is only a tool for your digital token management. Chainboat shall not control the quality, safety or legality of the products and services provided by the third party DApp, the authenticity or accuracy of the information and the ability of the other party to fulfill its obligations under the agreement entered into with you. All transactions conducted by you in the third-party DApp are your personal behaviors, and binding contractual relationships are established between you and your counterpart, and have nothing to do with Bytom Chrome Wallet. Chainboat reminds you to determine the authenticity, legitimacy and validity of login DApp and relevant information through your own careful judgment. You shall also bear the risks arising from your dealings with any third party.
    5. Chainboat may provide services to you and your counterparty at the same time. You agree to expressly exempt Chainboat from any actual or potential conflict of interest which may exist in such actions, and shall not claim that there are legal defects in the provision of services by Chainboat, nor thereby increase the liability or duty of care of Chainboat.
    6. Chainboat does not provide the following forms of warranty:
    (1) the timeliness, accuracy, integrity and reliability of the information captured by Chainboat in the digital asset market from third-party exchanges are guaranteed;
    (2) any technology, products, services and information you obtain through the Chainboat service will meet your expectations;
    (3) the Chainboat service will meet all your needs;
    (4) all parties to your transaction on Bytom Chrome Wallet will timely fulfill their obligations in the transaction agreement reached with you.
    7. You understand that Bytom Chrome Wallet only serves as a tool for users to manage digital assets and display transaction information. Chainboat does not provide legal, tax or investment advice and other services. You should seek advice from legal, tax and investment professionals on your own, and Chainboat shall not be responsible for any investment loss or data loss suffered by you during the use of our services.
    8. In any event, the total liability of Chainboat for breach of this agreement shall not exceed 450BTM or RMB 500 yuan, whichever is higher.
    9. You understand that in accordance with the requirements of relevant Chinese policies and regulations, we may change our user access criteria from time to time to limit the scope and mode of providing services to a particular group.
    X. entire agreement
    1. This agreement is made up of Bytom Chrome Wallet service agreement, Bytom Chrome Wallet privacy policy and rules published by Chainboat from time to time (including contents of "help center").
    2. Any translated version of this agreement is provided for the convenience of users only, and there is no intention to modify the terms of this agreement. If there is a conflict between the Chinese version and the non-chinese version of this agreement, the Chinese version shall prevail.
    3. Part of this agreement shall not affect the validity of other contents if it is deemed to be violated or invalid by a court with jurisdiction.
    Xi. Protection of intellectual property rights
    1. Bytom Chrome Wallet is an application developed and owned by Chainboat with intellectual property rights. The intellectual property rights of any content (including this agreement, announcement, article, video, audio, picture, file, information, data, trademark or logo) displayed in Bytom Chrome Wallet belong to Chainboat or a third party right holder. Users can only use Bytom Chrome Wallet applications and their contents for the purpose of holding and managing digital tokens. Without the prior written consent of Chainboat or any third party right holder, no person shall use, modify, reverse compile, copy, publicly disseminate, change, distribute, distribute or publicly publish the above applications and contents.
    Application of law and dispute resolution
    1. The validity, interpretation, modification, implementation and dispute resolution of this agreement and its revised version shall be governed by the laws of the People's Republic of China. In the absence of relevant provisions of laws, international commercial practices and/or industrial practices shall apply.
    2. If any dispute or dispute arises between you and Chainboat, it shall be settled through friendly negotiation. If no agreement can be reached through negotiation, either party may submit the dispute to the competent court in the place where Chainboat is located.
    Xiii. Miscellaneous
    1. If you are a user outside the People's Republic of China, you need to fully understand and comply with all relevant laws, regulations and rules of your jurisdiction and use of Chainboat service.
    2. In the process of using Chainboat service, if you encounter any problems, you can contact us through the official channel provided by Bytom Chrome Wallet.
    3. You can view this agreement in Bytom Chrome Wallet. Chainboat encourages you to consult the service agreement of Chainboat every time you visit Bytom Chrome Wallet.
    4. This agreement shall be effective as of November 1, 2018.
    For matters not covered in this agreement, you shall abide by the notice and relevant rules updated by Chainboat from time to time.
    Bytom.
    Bytom Chrome Wallet privacy policy
    Last updated on: November 12, 2018
    Dear users,
    Bytom Foundation Ltd. (hereinafter referred to as "Chainboat" or "we") respects and protects the privacy of users (hereinafter referred to as "you" or "user"). When you use Bytom Chrome Wallet, Chainboat will collect and use your personal information in accordance with this privacy policy (hereinafter referred to as "this policy").
    Chainboat suggests that you carefully read and understand all contents of this policy before using this product (hereinafter referred to as "Bytom Chrome Wallet"). Important information including disclaimer and other terms will be shown in bold. The definition of key words in this policy is consistent with Chainboat's Bytom Chrome Wallet service agreement.
    This policy can be updated by Chainboat online at any time. Once the updated policy is published, it will replace the original policy. If you do not accept the revised terms, please immediately stop using Bytom Chrome Wallet, and your continued use of Bytom Chrome Wallet will be deemed as acceptance of the revised policy. The revised policy will automatically take effect as soon as it is published on Bytom Chrome Wallet. You know that this policy and other relevant provisions are applicable to Bytom Chrome Wallet and DApp independently owned by Chainboat on Bytom Chrome Wallet.
    I. what information do we collect about you
    Please note that we collect the following information of you for the purpose of meeting your needs in Bytom Chrome Wallet service, and we attach great importance to the protection of your privacy. When we collect your information, we will strictly abide by the principle of "legal, legitimate and necessary". Moreover, you know that your service experience in Bytom Chrome Wallet may be affected if you do not provide relevant information required by our service.
    1. We will collect your PC device information, operation records, transaction records, wallet address and other personal information.
    2. To meet your specific service requirements, we will collect your name, bank card number, PC phone number, email address and other information.
    3. You are aware that your wallet password, private key, mnemonic word and Keystore on Bytom Chrome Wallet do not store or synchronize to Chainboat server. Chainboat does not provide services to retrieve your wallet password, private key, mnemonic, Keystore.
    4. In addition to the above content, you know that when you use the specific function of Bytom Chrome Wallet, we will make a special reminder to you before collecting your personal information and ask for more personal information from you. If you choose not to agree, it is deemed that you give up the use of Bytom Chrome Wallet, the specific function.
    5. After you jump to the third-party DApp, the third-party DApp will collect personal information from you. Bytom Chrome Wallet does not hold personal information collected from you by third-party DApp.
    6. To the extent permitted by laws and regulations, Chainboat may collect and use your personal information in the following situations without your authorization and consent:
    (1) those related to national security and national defense security;
    (2) those related to public security, public health or major public interests;
    (3) relating to criminal investigation, prosecution, trial and execution of judgment;
    (4) the personal information collected is disclosed to the public by you;
    (5) collect your personal information from legally disclosed information, such as legal news reports, government information disclosure and other channels;
    (6) it is necessary to maintain the safety and compliance of the services, such as finding and handling the faults of the products and services;
    (7) other circumstances stipulated by laws and regulations.
    7. We collect information as follows:
    (1) you provide us with information. For example, you fill in your name, PC phone number or bank card number in the "personal center" page, or provide an email address when giving feedback to questions, or provide additional information to us when using our specific services.
    (2) we obtain information during your use of Bytom Chrome Wallet, including your PC device information and your operation record of Bytom Chrome Wallet;
    (3) we copy all or part of your transaction records through the blockchain system. However, the transaction records shall be subject to the records of the block chain system.
    How do we use your information
    1. We confirm the correspondence between you and your wallet through the unique serial number of your PC device.
    2. We will timely send you important notices, such as software updates, service agreements and changes to the terms of this policy.
    3. We provide "fingerprint login" option for you in the "system Settings" of Bytom Chrome Wallet, which makes it convenient and more secure for you to manage your digital assets.
    4. We process your feedback to us by collecting your public wallet address and PC device information.
    5. We collect your personal information for internal audit, data analysis and research in Chainboat, so as to continuously improve our service level.
    6. In accordance with Bytom Chrome Wallet service agreement and other relevant regulations of Chainboat, Chainboat will manage and process users' usage behavior by using user information.
    7. Requirements of laws and regulations and cooperation with regulatory agencies.
    How do you control your information
    You have the following independent control over your personal information in Bytom Chrome Wallet:
    1. You can import your other wallet into Bytom Chrome Wallet by synchronizing wallet, or import your wallet in Bytom Chrome Wallet into other digital token management wallet. Bytom Chrome Wallet will show you the information to import the wallet.
    2. You know that you can modify the types of digital tokens, transfer money and receive money through the content of "assets" section.
    3. You know that in the "I" section of Bytom Chrome Wallet, you are free to choose the following operations:
    (1) in the "address book", you can view and modify your "contact address" at any time;
    (2) in "system Settings", you can choose not to turn on the "fingerprint login" option, that is, you can choose not to use the Touch ID authentication service provided by apple;
    (3) in the "personal center", you do not need to provide your name, PC phone number, bank card and other information, but when you use a specific service, you need to provide the above information;
    4. You know that when we collect information from you for a specific purpose, we will give you notice in advance, and you have the right to refuse. However, at the same time, you know that when you choose to refuse to provide relevant information, you give up the relevant services of Bytom Chrome Wallet.
    5. You know that you and we have no control over whether your transaction records are disclosed, because your transaction records are open and transparent in the whole blockchain system based on the open source properties of the blockchain trading system.
    6. Do you know when you use Bytom Chrome Wallet function after the jump to the third party DApp, our "Bytom Chrome Wallet service agreement", "Bytom Chrome Wallet privacy policy will no longer applicable, for your personal information about you on the third party DApp control problems, we recommend that you read before using third-party DApp and to understand its privacy rules and the related user services agreement, etc.
    7. You have the right to request us to update, change or delete your information.
    8. You are aware that we may collect your information in accordance with article 1, paragraph 6, of this policy without obtaining your authorization and consent.
    We may share or transmit your information
    1. Personal information collected and generated by Chainboat within the People's Republic of China will be stored on servers outside the People's Republic of China. If Chainboat really needs to transfer your personal information overseas, it will obtain your authorization in advance, transmits data across the border in accordance with relevant laws, regulations and policies, and keeps your personal information confidential.
    2. Without your prior consent, Chainboat will not share or transfer your personal information to any third party, except as follows:
    (1) obtain your express consent or authorization in advance;
    (2) the personal information collected is disclosed to the public by you;
    (3) the personal information collected is collected from the information legally disclosed, such as legal news reports, government information disclosure and other channels;
    (4) sharing with related parties of Chainboat, we will only share necessary user information and are bound by the purpose stated in this privacy clause;
    (5) according to applicable laws and regulations, requirements of legal procedures, and requirements of administrative or judicial organs;
    (6) in case of merger or acquisition, if personal information transfer is involved, Chainboat will require the recipient of personal information to continue to be bound by this policy.
    How do we protect your information
    1. If Chainboat ceases to operate, Chainboat will stop the activity of collecting your personal information in a timely manner, notice of cessation of operation will be announced on Bytom Chrome Wallet, and your personal information held by Chainboat will be deleted or anonymous within a reasonable period of time.
    2. In order to protect your personal information, Chainboat will take data security technical measures, improve internal compliance level, increase internal employee information security training, and set security access rights for relevant data to protect your privacy information.
    3. We will send you information about information security in Bytom Chrome Wallet "message center", and update wallet usage and information protection information in Bytom Chrome Wallet "help center" section from time to time for your reference.
    Protection of minors
    We hereby make the following special provisions for the protection of minors under the age of 18:
    1. Minors should use Chainboat related services under the guidance of their parents or guardians.
    2. We suggest that parents and guardians of minors should guide minors to use Bytom Chrome Wallet on the premise of reading this policy, Bytom Chrome Wallet service agreement and our other relevant rules.
    3. Bytom Chrome Wallet will protect the confidentiality and security of minors' personal information in accordance with relevant national laws and regulations.
    Vii. Disclaimer
    1. Please note that after you access the third-party DApp through Bytom Chrome Wallet, the privacy policy issued by the third-party DApp will be applied. The collection and use of your personal information by this third-party DApp is not controlled by Chainboat and is not subject to this policy. Chainboat cannot guarantee that third-party DApp will take personal information protection measures as required by Chainboat.
    2. You should carefully select and use third-party DApp and properly protect your personal information. Chainboat is not responsible for the privacy protection of other third-party DApp.
    3. Chainboat will take reasonable security measures to protect your personal information as far as possible under current technical conditions to avoid information leakage, tampering or damage. The Chainboat system USES wireless data transmission, so the privacy and security of data transmission over wireless networks cannot be guaranteed.
    Eight, other
    1. If you are a user outside the People's Republic of China, you need to fully understand and comply with all relevant laws, regulations and rules of your jurisdiction and the use of Chainboat service.
    2. In the process of using Chainboat service, if you encounter any questions about the use of personal information, you can contact us by submitting feedback in Bytom Chrome Wallet and other ways.
    3. You can view this policy and other service rules of Chainboat in Bytom Chrome Wallet. We encourage you to check the service agreement and privacy policy of Chainboat every time you visit Bytom Chrome Wallet.
    4. Any translated version of this policy is provided for the convenience of users only, and there is no intention to modify the provisions of this policy. If there is a conflict between the Chinese version of this policy and the non-chinese version, the Chinese version shall prevail.
    5. This policy shall apply from November 12, 2018.
    For matters not covered in this policy, you are required to comply with the notice and relevant rules updated by Chainboat from time to time.
`
  },
  privacy:{
    "title":"Privacy Police",
    "content":`Dear Users,

Chainboat Technology Ltd. (“Company”, “we”, “us”, or “our”) respects and protects the privacy of Users (“you”, “your” or “Users”). The Company will collect, use, disclose and process your Personal Information, in accordance with this Privacy Policy (“Policy”) when you:

(a) access or use our website and mobile applications (“Applications”) and services; and/or
(b) provide us with your Personal Information, regardless or the medium through which such Personal Information is provided.
The Company recommends that you shall carefully read and understand the whole contents of this Policy before your use of the Applications. Additionally, significant information including the Disclaimer is in bold form in this Policy. Definitions of key words in this Policy are consistent with those in the Bytom MOV Terms of Service of the Company. If there is any discrepancy between the definitions of any defined term used in this Policy and the Bytom MOV Terms of Service , the definition of any defined term used in this Policy shall prevail.

By providing us with your Personal Information, you consent to our collection, use, disclosure (including transfer) and processing of your Personal Information in accordance with this Policy. Please DO NOT provide any Personal Information to us if you do not accept this Policy.

The Company reserves the right to update this Policy online from time to time, without notice to you, and the revised Policy will come into effect and supersede the older versions once posted on our Applications. The revised Policy will apply to Personal Information provided to us previously. In particular, if you do not accept the revised Policy, please immediately stop your use of the Applications. Your continuous use of our Applications will be regarded as your acceptance of the revised policy.

1 Information We Collect

1.1 We collect your Personal Information, including but not limited to your device information, operation records, transaction records and wallet addresses.

1.2 In order to satisfy your needs or requests for specific services, we may also collect Personal Information.

1.3 You confirm that your Wallet Password, Private Key, Mnemonic Words, Keystore on the Applications are not stored or synchronized on the Company’ servers. The Company does not offer the service to recover your Wallet Password, Private Key, Mnemonic Words or Keystore.

1.4 We may also request for you to provide us with additional Personal Information in order for us to enable your use of any specific functions of the Applications. Your refusal to provide us with the requested Personal Information will be considered as your choice to not use a particular specific function of the Applications.

1.5 To the extent permitted by applicable laws and regulations, the Company may collect and use the Personal Information in the following circumstances without your prior consent or authorization:

1.5.1 information related to national security and national defense;

1.5.2 information related to public security, public health, significant public interests;

1.5.3 information related to criminal investigation, prosecution, trial and enforcement;

1.5.4 Personal Information in the public domain;

1.5.5 Personal Information collected from legally publicly disclosed information, such as legal news reports, government information disclosure and other channels;

1.5.6 Personal Information necessary to maintain the security and compliance of services, such as to detect or to solve the malfunction of products and services; and/or

1.5.7 other circumstances permitted by laws and regulations.

1.6 We collect information in the following ways:

1.6.1 when you provide us with your Personal Information for whatever reasons;

1.6.2 when you authorize us to obtain your Personal Information from a third party;

1.6.3 when you register for a user account on our Applications;

1.6.4 when you contact us or interact with our employees through various communication channels, for example, through social media platforms, messenger platforms, face-to-face meetings, telephone calls, emails, fax and letters;

1.6.5 when you transact with us, contact us or request that we contact you;

1.6.6 when you request to be included in an email or our mailing list; and/or

1.6.7 when we copy all or part of your transaction records on the blockchain. However, you should refer to the blockchain system for your latest transaction records.

1.7 Our Applications may contain certain technologies that collect Personal Information in the manner described in this Policy (see paragraph 5 below) or the applicable terms and conditions.

1.8 Your provision of Personal Information to us is voluntary and you may withdraw your consent for us to use your Personal Information at any time. However, if you choose not to provide us with the Personal Information we require, it may not be possible for you to use the Applications or for us to contact you, or provide products or services which you need from us.

1.9 In certain circumstances, you may also provide us with the Personal Information of persons other than yourself. If you do so, you warrant that you have informed him/her of the purposes for which we are collecting his/her Personal Information and that he/she has consented to your disclosure of his/her Personal Information to us for those purposes. You agree to indemnify and hold us harmless from and against any and all claims by such individuals relating to our collection, use and disclosure of such Personal Information in accordance with the terms of this Policy.

1.10 You are responsible for ensuring that all Personal Information that you provide to us is true, accurate and complete. You are responsible for informing us of any changes to your Personal Information.

2 How We Use Your Information

2.1 We collect, use or disclose your Personal Information for one or more of the following purposes:

2.1.1 to provide you with products and/or services that you request for;

2.1.2 to manage your relationship with us;

2.1.3 to facilitate your use of our Applications;

2.1.4 to associate you with your wallet by the unique serial number of your mobile device;

2.1.5 to push important notifications to you, such as software update, update of Terms of Service and this Policy;

2.1.6 to assist with your enquiries, feedback, complaints and requests by using the Wallet Address and the mobile device information provided by you;

2.1.7 to notify you of our products, services, programmes and events;

2.1.8 to resolve any disputes, investigating any complaint, claim or dispute or any actual or suspected illegal or unlawful conduct;

2.1.9 to conduct our internal audit, data analysis and research;

2.1.10 to conduct user behavior tracking by tracking the Users’ use of the Applications;

2.1.11 to comply with our obligations in accordance with laws, regulations and to cooperate with regulatory authorities;

2.1.12 to comply with international sanctions and applicable regulation for securities and to counter money-laundering or financing of terrorism;

2.1.13 to enforce obligations owed to us, and contractual terms and conditions; and/or

2.1.14 any other reasonable purposes related to the aforesaid.

3 How You Control Your Own Information

You are entitled to control your Personal Information provided to Bytom MOV.

3.1 You may disconnect your wallets from Bytom MOV to connect another wallet，and you may connect wallet to other website which provide service about blockchain.Bytom MOV will display the information of connected wallets to you.

3.2 You acknowledge that since blockchain is an open source system, your transaction records are automatically public and transparent in the whole blockchain.

3.3 Our Applications may contain links to other websites, applications or Smart Contracts that are not owned, operated, developed or maintained by us. These links are provided only for your convenience. This Policy only applies to our Applications. When using Third-Party Service, you understand that the Bytom MOV Terms of Service and Bytom MOV Privacy Policy will no longer apply. You are encouraged to carefully review their privacy policies and related terms of service.

3.4 You are entitled to ask us to update, revise, and delete your Personal Information. If you wish to update, revise, delete or have access to your Personal Information held by us, or if you do not accept any amendment to this Policy, please contact us.

3.5 We may charge you a fee for responding to your request for access to your Personal Information held by us, or for information about the ways in which we have (or may have) used your Personal Information in the one-year period preceding your request. If a fee is to be charged, we will inform you of the amount beforehand and respond to your request after payment is received. We will endeavour to respond to your request within thirty (30) days, and if that is not possible, we will inform you of the time by which we will respond to you.

3.6 In many circumstances, we need to use your Personal Information in order for us to provide you with products or services that you require. If you do not provide us with the required Personal Information, or if you withdraw your consent to our use and/or disclosure of your Personal Information for these purposes, it may not be possible for us to continue to serve you or provide you with the products and services that you require.

4 Information We may Share or Transfer

4.1 We will keep your Personal Information for so long as we need the Personal Information for our business and legal purposes.

4.2 We do not sell, trade or otherwise transfer your Personal Information to third parties without your consent.

4.3 If you have consented to our disclosure of your Personal Information to our strategic business partners and associates, we may disclose your Personal Information to them. They will use your Personal Information only for the purposes you have consented to.

4.4 You agree that we may disclose or share your Personal Information with third parties such as:

4.4.1 service providers and data processors working on our behalf and providing services to us such as conducting know-your-clients checks, accounting, data processing or management services, website hosting, maintenance and operation services, e-mail message services, analysis services, handling of payment transactions, marketing etc; and

4.4.2 our consultants and professional advisors (such as accountants, lawyers, auditors).

4.5 If we need to transfer your Personal Information to any country for the purposes set out above, we shall obtain your prior consent and ensure that the recipient of the Personal Information protects your Personal Information to the same level as we have committed to protecting your Personal Information. Where these countries or territories do not have personal data protection laws that are comparable to the laws applicable to our relationship with you, we will enter into legally enforceable agreements with the recipients.

4.6 The Company will not share with or transfer your Personal Information to any third party without your prior consent, except for the following circumstances:

4.6.1 the collected Personal Information is publicized by yourself;

4.6.2 the Personal Information is collected from public information which was legally disclosed, such as news (lawfully reported), government information disclosure and other channels;

4.6.3 in order to abide by applicable laws, regulations, legal procedures, and administrative or judiciary authorities or to enforce our Policy or protect our or others’ rights, property or safety;

4.6.4 in the case of mergers and acquisitions, if transfer of Personal Information is involved, the Company may require the receivers of Personal Information to be continuously bound by this Policy.

5 Automatic Data Collection Technologies

5.1 We use Automatic Data Collection Technologies on our Applications. Examples of such technologies include:

5.1.1 Cookies (or browser cookies). Cookies are small text files which are set by a website or application operator so that your browser or device may be recognised. We may make use of cookies on our Applications to store and track information such as the number of users and their frequency of use, profiles of users and their online preferences. Cookies do not capture information which would personally identify you, but the information collected may be used to assist us in analysing the usage of our Applications and to improve your online experience with us. You can disable the cookies by changing the setting on your browser. However, this may affect the functionality of the Applications.

5.1.2 Web analytics. Web analytics is the term given to a method for collecting and assessing the behaviour of visitors to websites and mobile applications. This includes the analysis of traffic patterns in order, for example, to determine the frequency of visits to certain parts of a website or mobile application, or to find out what information and services our visitors are most interested in. The web analytics services on our Applications are provided by third-party service providers.

6 How We Protect Your Information

6.1 If the Company ceases operation, the Company will stop the collection of your Personal Information, and take steps to delete or anonymize your Personal Information held by us within a reasonable period.

6.2 To protect your Personal Information, the Company may adopt data security techniques, improve internal compliance levels, provide security training for our staff, and set security authority for access to relevant data to protect your Personal Information.

6.3 We will send you messages about information security in the “Notifications” column and update articles concerning the use of wallets and information protection in the “Support” column on our Applications for your reference.

7 Protection for the Minors

The following special provisions apply to minors who are under the age of 18 years old:

7.1 The minors shall not use Bytom MOV without the guidance from their parents or guardians.

7.2 The parents and guardians of the minors shall provide guidance to the minors on using Bytom MOV after they read this Policy, Bytom MOV Terms of Service and other relevant rules.

7.3 Bytom MOV will ensure the confidentiality and security of the minors’ Personal Information in accordance with the applicable laws and regulations.

8 Disclaimer

8.1 After you use Third-Party Service, you acknowledge that this Policy no longer applies to the collection, use, disclosure and transfer of your Personal Information by these third parties. The Company is unable to guarantee that these third parties will implement reasonable security measures to protect your Personal Information.

8.2 You are solely responsible for your use of Third-Party Service and agree that you will not hold the Company liable for any damages incurred or injuries inflicted as a result of the collection, use, disclosure and transfer of your Personal Information by these third parties.

8.3 YOU ACKNOWLEDGE AND ACCEPT THAT, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY WILL ADOPT MEASURES AS REASONABLE AS POSSIBLE TO PROTECT YOUR PERSONAL INFORMATION UNDER CURRENT TECHNIQUES ON AN “AS IS”, “AS AVAILABLE” AND “WITH ALL FAULTS” BASIS, TO AVOID THE DISCLOSURE, TAMPERING OR DAMAGE OF INFORMATION. SINCE THE COMPANY TRANSFERS DATA WIRELESSLY, THE COMPANY MAKES NO GUARANTEE ON THE PRIVACY AND SECURITY OF WIRELESS INTERNET DATA TRANSFERRING.

9 Miscellaneous

9.1 You shall fully understand and conform to the laws, regulations and rules in your jurisdictions which are relevant to use of the services provided by the Company.`
  }
}

export default en
