Issue.create(
  title: 'Marijuana legalization',
  thumbnail: 'weed'
)

Issue.create(
  title: 'Software patent trolling',
  thumbnail: 'troll'
)

Issue.create(
  title: 'TSA nude body scanners',
  thumbnail: 'tsa'
)

Issue.create(
  title: 'Electoral College',
  thumbnail: 'electoralcollege'
)

Issue.create(
  title: 'Finland\'s education system',
  thumbnail: 'finland'
)

Issue.create(
  title: 'Climate change',
  thumbnail: 'climate'
)

Issue.create(
  title: 'College and University',
  thumbnail: 'college'
)

Issue.create(
  title: 'Ethanol subsidies',
  thumbnail: 'ethanol'
)

Issue.create(
  title: 'Universal health care',
  thumbnail: 'health'
)

Issue.create(
  title: 'Federal employee compensation',
  thumbnail: 'employee'
)

Issue.create(
  title: 'Hydraulic fracking',
  thumbnail: 'fracking'
)

Issue.create(
  title: 'Trans fat',
  thumbnail: 'transfats'
)

Issue.create(
  title: 'Unmanned aerial vehicles',
  thumbnail: 'drones'
)

Issue.create(
  title: 'Federal minimum wage',
  thumbnail: 'minimumwage'
)

Issue.create(
  title: 'Oil company subsidies',
  thumbnail: 'oilsubsidies'
)

Issue.create(
  title: 'Offshore drilling',
  thumbnail: 'offshoreoil'
)

Issue.create(
  title: 'Citizens United',
  thumbnail: 'citizensunited'
)

Issue.create(
  title: 'Abortion',
  thumbnail: 'abortion'
)

Question.create(
  issue_id: 1,
  title: 'What percent of all US arrests are marijuana-related?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 7,
  units: '/%',
  is_decimal: false,
  url: 'http://blog.norml.org/2011/09/19/marijuana-arrests-driving-americas-so-called-drug-war-latest-fbi-data-shows/'
)

Question.create(
  issue_id: 1,
  title: 'What percent of all US drug arrests are marijuana-related?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 50,
  units: '/%',
  is_decimal: false,
  url: 'http://blog.norml.org/2011/09/19/marijuana-arrests-driving-americas-so-called-drug-war-latest-fbi-data-shows/'
)

Question.create(
  issue_id: 1,
  title: 'What percent of Americans have tried marijuana at least once?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 42,
  units: '/%',
  is_decimal: false,
  url: 'http://www.time.com/time/health/article/0,8599,1821697,00.html'
)

Question.create(
  issue_id: 1,
  title: 'Approximately what percent of Americans support marijuana legalization?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 50,
  units: '/%',
  is_decimal: false,
  url: 'http://www.csmonitor.com/USA/2012/0523/Poll-shows-strong-support-for-legal-marijuana-Is-it-inevitable'
)

Question.create(
  issue_id: 1,
  title: 'In 1969, approximately what percent of Americans supported marijuana legalization?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 16,
  units: '/%',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/Legality_of_cannabis'
)

Question.create(
  issue_id: 1,
  title: 'Given that the US has 5% of the worlds population, what percent of the worlds prison population does the US have?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 25,
  units: '/%',
  is_decimal: false,
  url: 'http://www.nytimes.com/2008/04/23/us/23prison.html?pagewanted=all&_r=0'
)

Question.create(
  issue_id: 1,
  title: 'What percent of Mexico\'s GDP is from marijuana sales?',
  is_exponential: false,
  min: 0.1,
  max: 10.0,
  correct: 0.2,
  units: '/%',
  is_decimal: true,
  url: 'http://www.economist.com/blogs/democracyinamerica/2012/11/legalising-marijuana?fsrc=scn/tw/te/bl/viewfromMexico'
)

Question.create(
  issue_id: 1,
  title: 'In addition to Washington DC, how many states have legalized medical marijuana?',
  is_exponential: false,
  min: 0,
  max: 50,
  correct: 20,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/Medical_cannabis#United_States'
)

Question.create(
  issue_id: 18,
  title: 'How many days after conception does a fetus\'s heart begin to beat?',
  is_exponential: false,
  min: 1,
  max: 200,
  correct: 21,
  units: '/ days',
  is_decimal: false,
  url: 'http://www.abortionfacts.com/literature/literature_9438MS.asp#day21'
)

Question.create(
  issue_id: 18,
  title: 'What percent of US women have an unintended pregnancy by age 45?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 50,
  units: '/%',
  is_decimal: false,
  url: 'http://www.guttmacher.org/pubs/fb_induced_abortion.html'
)

Question.create(
  issue_id: 18,
  title: 'What percent of US women have an abortion by age 20?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 10,
  units: '/%',
  is_decimal: false,
  url: 'http://www.guttmacher.org/pubs/fb_induced_abortion.html'
)

Question.create(
  issue_id: 18,
  title: 'What percent of US women obtaining an abortion identify as Protestant?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 37,
  units: '/%',
  is_decimal: false,
  url: 'http://www.guttmacher.org/pubs/fb_induced_abortion.html'
)

Question.create(
  issue_id: 18,
  title: 'What percent of US women who receive abortions are teenagers?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 18,
  units: '/%',
  is_decimal: false,
  url: 'http://www.guttmacher.org/pubs/fb_induced_abortion.html'
)

Question.create(
  issue_id: 18,
  title: 'How many days after conception does a fetus\'s  brain begin cognitive function?',
  is_exponential: false,
  min: 0,
  max: 200,
  correct: 41,
  units: '/ days',
  is_decimal: false,
  url: 'http://www.christiananswers.net/q-sum/q-life019.html'
)

Question.create(
  issue_id: 17,
  title: 'How much money was spent per vote on the 2012 presidential election?',
  is_exponential: true,
  min: 0.1,
  max: 1000,
  correct: 15.87,
  units: '$/',
  is_decimal: true,
  url: 'http://elections.nytimes.com/2012/campaign-finance'
)

Question.create(
  issue_id: 17,
  title: 'How much money was spent per vote on the 2008 presidential election?',
  is_exponential: true,
  min: 0.1,
  max: 1000,
  correct: 8.37,
  units: '$/',
  is_decimal: true,
  url: 'https://www.opensecrets.org/pres08/'
)

Question.create(
  issue_id: 17,
  title: 'What percent of campaign money was raised from small donors for the 2008 presidential election?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 18,
  units: '/%',
  is_decimal: false,
  url: 'http://www.cfinst.org/press/releases_tags/10-01-08/Revised_and_Updated_2008_Presidential_Statistics.aspx'
)

Question.create(
  issue_id: 6,
  title: 'How much have CO2 emissions by human activities increased since 1990?',
  is_exponential: true,
  min: 0,
  max: 1000,
  correct: 16,
  units: '/%',
  is_decimal: false,
  url: 'http://www.epa.gov/climatechange/science/indicators/ghg/us-ghg-emissions.html'
)

Question.create(
  issue_id: 6,
  title: 'By approximately how many degrees has the Earth\'s temperature risen since 1880?',
  is_exponential: false,
  min: 0.1,
  max: 25,
  correct: 1,
  units: '/ deg',
  is_decimal: true,
  url: 'http://www.dailymail.co.uk/sciencetech/article-2217286/Global-warming-stopped-16-years-ago-reveals-Met-Office-report-quietly-released--chart-prove-it.html'
)

Question.create(
  issue_id: 6,
  title: 'What percent of climate scientists agree that climate change is largely caused by humans?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 97,
  units: '/%',
  is_decimal: false,
  url: 'http://www.pnas.org/content/early/2010/06/04/1003187107.abstract'
)

Question.create(
  issue_id: 6,
  title: 'Approximately how much have sea levels risen in the last century (inches)?',
  is_exponential: true,
  min: 0,
  max: 1000,
  correct: 7,
  units: '/ in',
  is_decimal: false,
  url: 'http://www.edf.org/climate/how-we-know-the-earth-is-warming'
)

Question.create(
  issue_id: 6,
  title: 'By how many degrees has the Earth\'s temperature increased since 1997?',
  is_exponential: false,
  min: 0,
  max: 25,
  correct: 0,
  units: '/ deg',
  is_decimal: false,
  url: 'http://www.dailymail.co.uk/sciencetech/article-2217286/Global-warming-stopped-16-years-ago-reveals-Met-Office-report-quietly-released--chart-prove-it.html'
)

Question.create(
  issue_id: 6,
  title: 'Approximately how much higher are current CO2 levels than natural, historical levels?',
  is_exponential: true,
  min: 0,
  max: 1000,
  correct: 30,
  units: '/%',
  is_decimal: false,
  url: 'http://www.edf.org/climate/human-activity-causes-warming'
)

Question.create(
  issue_id: 7,
  title: 'Approximately what percent of unemployed Americans have attended at least some college?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 50,
  units: '/%',
  is_decimal: false,
  url: 'http://www.businessinsider.com/these-two-charts-prove-a-college-education-just-isnt-worth-the-money-anymore-2012-6'
)

Question.create(
  issue_id: 7,
  title: 'Approximately what percent of US jobs require at least a 2 year degree?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 67,
  units: '/%',
  is_decimal: false,
  url: 'https://www.acteonline.org/uploadedFiles/Publications_and_E-Media/files/files-techniques-2009/Theme_4(3).pdf'
)

Question.create(
  issue_id: 7,
  title: 'Approximately how much per year does it cost to attend a private US college?',
  is_exponential: true,
  min: 1000,
  max: 1000000,
  correct: 43500,
  units: '$/',
  is_decimal: false,
  url: 'http://money.cnn.com/2012/03/27/pf/college/tuition-costs.moneymag/index.htm'
)

Question.create(
  issue_id: 7,
  title: 'Since 1993, how many more administrators than professors have been hired by universities?',
  is_exponential: true,
  min: 1,
  max: 100,
  correct: 10,
  units: '/ times',
  is_decimal: false,
  url: 'http://www.businessweek.com/articles/2012-11-21/the-troubling-dean-to-professor-ratio'
)

Question.create(
  issue_id: 7,
  title: 'What is the median US family income?',
  is_exponential: false,
  min: 15000,
  max: 200000,
  correct: 51400,
  units: '$/',
  is_decimal: false,
  url: 'http://usatoday30.usatoday.com/money/economy/story/2012-02-09/income-rising/53033322/1'
)

Question.create(
  issue_id: 7,
  title: 'How much does the average working college graduate earn per year?',
  is_exponential: false,
  min: 15000,
  max: 300000,
  correct: 80000,
  units: '$/',
  is_decimal: false,
  url: 'http://www9.georgetown.edu/grad/gppi/hpi/cew/pdfs/FullReport.pdf'
)

Question.create(
  issue_id: 7,
  title: 'How much does the average working non-college graduate earn per year?',
  is_exponential: false,
  min: 15000,
  max: 300000,
  correct: 40000,
  units: '$/',
  is_decimal: false,
  url: 'http://www9.georgetown.edu/grad/gppi/hpi/cew/pdfs/FullReport.pdf'
)

Question.create(
  issue_id: 7,
  title: 'What percent of college graduates are either unemployed or underemployed?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 50,
  units: '/%',
  is_decimal: false,
  url: 'http://www.ibtimes.com/half-recent-us-college-graduates-unemployed-or-underemployed-440742'
)

Question.create(
  issue_id: 7,
  title: 'Adjusted for inflation, how much has the cost of a 4-year degree increased since 1980?',
  is_exponential: true,
  min: 1,
  max: 1000,
  correct: 100,
  units: '/%',
  is_decimal: false,
  url: 'http://www.businessinsider.com/these-two-charts-prove-a-college-education-just-isnt-worth-the-money-anymore-2012-6'
)

Question.create(
  issue_id: 7,
  title: 'Adjusted for inflation, how much have college graduate earnings increased since 1990?',
  is_exponential: true,
  min: 1,
  max: 1000,
  correct: 2,
  units: '/%',
  is_decimal: false,
  url: 'http://www.businessinsider.com/these-two-charts-prove-a-college-education-just-isnt-worth-the-money-anymore-2012-6'
)

Question.create(
  issue_id: 7,
  title: 'Since the 1980s, how much as the price of college textbooks increased?',
  is_exponential: true,
  min: 1,
  max: 1000,
  correct: 600,
  units: '/%',
  is_decimal: false,
  url: 'http://usatoday30.usatoday.com/news/education/story/2012-02-12/college-costs-free-textbooks/53123522/1'
)

Question.create(
  issue_id: 7,
  title: 'What is the US per capital student loan debt?',
  is_exponential: true,
  min: 1,
  max: 10000,
  correct: 3215,
  units: '$/',
  is_decimal: false,
  url: 'http://www.nytimes.com/2012/05/13/business/student-loans-weighing-down-a-generation-with-heavy-debt.html?_r=2&pagewanted=all&'
)

Question.create(
  issue_id: 4,
  title: 'How many times has a constitutional amendment to reform or eliminate the electoral college been proposed?',
  is_exponential: true,
  min: 0,
  max: 100000,
  correct: 700,
  units: '/ times',
  is_decimal: false,
  url: 'http://www.archives.gov/federal-register/electoral-college/faq.html#changes'
)

Question.create(
  issue_id: 4,
  title: 'How many US presidents won the presidental race without winning the popular vote?',
  is_exponential: false,
  min: 0,
  max: 20,
  correct: 4,
  units: '/',
  is_decimal: false,
  url: 'http://americanhistory.about.com/od/uspresidents/f/pres_unpopular.htm'
)

Question.create(
  issue_id: 4,
  title: 'How many electoral votes are needed to win the presidential election?',
  is_exponential: true,
  min: 0,
  max: 600,
  correct: 270,
  units: '/ votes',
  is_decimal: false,
  url: 'http://www.archives.gov/federal-register/electoral-college/about.html'
)

Question.create(
  issue_id: 4,
  title: 'How many US presidents have openly supported abolishing the electoral college?',
  is_exponential: true,
  min: 0,
  max: 43,
  correct: 4,
  units: '/',
  is_decimal: false,
  url: 'http://spot.colorado.edu/~mcguire/alternatevoting.htm'
)

Question.create(
  issue_id: 4,
  title: 'According to a 2011 Gallup poll, approximately what percent of Americans support abolishing the electoral college?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 62,
  units: '/%',
  is_decimal: false,
  url: 'http://www.gallup.com/poll/150245/americans-swap-electoral-college-popular-vote.aspx'
)

Question.create(
  issue_id: 8,
  title: 'How many pounds of corn is required to produce a gallon of ethanol?',
  is_exponential: true,
  min: 1,
  max: 100,
  correct: 26,
  units: '/ lbs',
  is_decimal: false,
  url: 'http://auto.howstuffworks.com/fuel-efficiency/alternative-fuels/question707.htm'
)

Question.create(
  issue_id: 8,
  title: 'When burning ethanol, how much less CO2 is produced relative to gasoline?',
  is_exponential: true,
  min: 0,
  max: 100,
  correct: 40,
  units: '/%',
  is_decimal: false,
  url: 'http://www.ethanolrfa.org/pages/ethanol-facts-environment'
)

Question.create(
  issue_id: 8,
  title: 'How much less fuel efficient is burning ethanol vs gasoline?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 30,
  units: '/%',
  is_decimal: false,
  url: 'http://auto.howstuffworks.com/fuel-efficiency/alternative-fuels/question707.htm'
)

Question.create(
  issue_id: 8,
  title: 'Per capita, how much have crop subsidies cost the US government?',
  is_exponential: true,
  min: 0,
  max: 100000,
  correct: 623,
  units: '$/',
  is_decimal: false,
  url: 'http://farm.ewg.org/'
)

Question.create(
  issue_id: 8,
  title: 'From production/growing to consumption (the total process), how much more energy is required to make a gallon of corn ethanol than gasoline?',
  is_exponential: true,
  min: 0,
  max: 1000,
  correct: 300,
  units: '/%',
  is_decimal: false,
  url: 'http://www.slate.com/articles/news_and_politics/hey_wait_a_minute/2005/07/corn_dog.html'
)

Question.create(
  issue_id: 10,
  title: 'What percent of private-sector US employees are union members?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 7,
  units: '/%',
  is_decimal: false,
  url: 'http://www.kansascity.com/2012/01/27/3395890/percentage-of-workforce-represented.html'
)

Question.create(
  issue_id: 10,
  title: 'What percent of US federal employees are union members?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 37,
  units: '/%',
  is_decimal: false,
  url: 'http://www.kansascity.com/2012/01/27/3395890/percentage-of-workforce-represented.html'
)

Question.create(
  issue_id: 10,
  title: 'Adjusting for education, how much higher is total compensation for federal vs private sector employees?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 16,
  units: '/%',
  is_decimal: false,
  url: 'http://www.cbo.gov/publication/42921'
)

Question.create(
  issue_id: 10,
  title: 'What percent of the total federal budget is spend on veteran and retired federal employee benefits?',
  is_exponential: false,
  min: 0,
  max: 40,
  correct: 7,
  units: '/%',
  is_decimal: false,
  url: 'http://www.cbpp.org/cms/index.cfm?fa=view&id=1258'
)

Question.create(
  issue_id: 10,
  title: 'What percent of federal government employees are fired each year?',
  is_exponential: true,
  min: 0,
  max: 20,
  correct: 0.55,
  units: '/%',
  is_decimal: true,
  url: 'http://usatoday30.usatoday.com/news/washington/2011-07-18-fderal-job-security_n.htm'
)

Question.create(
  issue_id: 10,
  title: 'What percent of private sector employees are fired each year?',
  is_exponential: true,
  min: 0,
  max: 20,
  correct: 3,
  units: '/%',
  is_decimal: false,
  url: 'http://usatoday30.usatoday.com/news/washington/2011-07-18-fderal-job-security_n.htm'
)

Question.create(
  issue_id: 14,
  title: 'What percent of working Americans make minimum wage?',
  is_exponential: false,
  min: 0,
  max: 20,
  correct: 1,
  units: '/%',
  is_decimal: false,
  url: 'http://www.bls.gov/cps/minwage2011.htm'
)

Question.create(
  issue_id: 14,
  title: 'What percent of working teenagers make minimum wage?',
  is_exponential: false,
  min: 0,
  max: 50,
  correct: 13,
  units: '/%',
  is_decimal: false,
  url: 'http://www.bls.gov/cps/minwage2011tbls.htm#1'
)

Question.create(
  issue_id: 14,
  title: 'What percent of working women make minimum wage?',
  is_exponential: false,
  min: 0,
  max: 30,
  correct: 3,
  units: '/%',
  is_decimal: false,
  url: 'http://www.bls.gov/cps/minwage2011tbls.htm#1'
)

Question.create(
  issue_id: 14,
  title: 'What is the US poverty line for a family of four?',
  is_exponential: false,
  min: 5000,
  max: 50000,
  correct: 23050,
  units: '$/',
  is_decimal: false,
  url: 'http://coverageforall.org/pdf/FHCE_FedPovertyLevel.pdf'
)

Question.create(
  issue_id: 14,
  title: 'In what year was the first US minimum wage implemented?',
  is_exponential: false,
  min: 1776,
  max: 2010,
  correct: 1938,
  units: '/',
  is_decimal: false,
  url: 'http://www.cato.org/sites/cato.org/files/pubs/pdf/PA701.pdf'
)

Question.create(
  issue_id: 14,
  title: 'How many US states have a higher minimum wage than the federal level?',
  is_exponential: false,
  min: 0,
  max: 50,
  correct: 18,
  units: '/',
  is_decimal: false,
  url: 'http://www.nytimes.com/2012/06/07/business/bill-pushes-for-increase-in-wages.html?_r=1&'
)

Question.create(
  issue_id: 14,
  title: 'What percent of countries have minimum wage laws?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 90,
  units: '/%',
  is_decimal: false,
  url: 'http://www.conservapedia.com/Minimum_wage'
)

Question.create(
  issue_id: 5,
  title: 'For primary education, how much does the US annually spend per student?',
  is_exponential: true,
  min: 100,
  max: 100000,
  correct: 15000,
  units: '$/',
  is_decimal: false,
  url: 'http://www.oecd-ilibrary.org/sites/eag_highlights-2011-en/03/01/index.html;jsessionid=1gcqdsr4ne73e.delta?contentType=&itemId=/content/chapter/eag_highlights-2011-21-en&containerItemId=/content/serial/2076264x&accessItemIds=/content/book/eag_highlights-20'
)

Question.create(
  issue_id: 5,
  title: 'For primary education, how much does Finland annually spend per student?',
  is_exponential: true,
  min: 100,
  max: 100000,
  correct: 9000,
  units: '$/',
  is_decimal: false,
  url: 'http://www.oecd-ilibrary.org/sites/eag_highlights-2011-en/03/01/index.html;jsessionid=1gcqdsr4ne73e.delta?contentType=&itemId=/content/chapter/eag_highlights-2011-21-en&containerItemId=/content/serial/2076264x&accessItemIds=/content/book/eag_highlights-20'
)

Question.create(
  issue_id: 5,
  title: 'According to the Education Index, what is Finland\'s worldwide academic ranking?',
  is_exponential: true,
  min: 1,
  max: 100,
  correct: 2,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/Education_Index'
)

Question.create(
  issue_id: 5,
  title: 'According to the Education Index, what is the US worldwide academic ranking?',
  is_exponential: true,
  min: 1,
  max: 100,
  correct: 20,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/Education_Index'
)

Question.create(
  issue_id: 16,
  title: 'As a percent of annual net income, how much money did BP pay for the 2010 oil spill?',
  is_exponential: true,
  min: 1,
  max: 10000,
  correct: 181,
  units: '/%',
  is_decimal: false,
  url: 'http://www.bp.com/sectiongenericarticle800.do?categoryId=9036584&contentId=7067605'
)

Question.create(
  issue_id: 16,
  title: 'Where does the US rank worldwide for oil production?',
  is_exponential: true,
  min: 1,
  max: 100,
  correct: 3,
  units: '/',
  is_decimal: false,
  url: 'https://www.cia.gov/library/publications/the-world-factbook/rankorder/2173rank.html'
)

Question.create(
  issue_id: 16,
  title: 'What percent of oil consumed in the US is imported?',
  is_exponential: true,
  min: 0,
  max: 100,
  correct: 45,
  units: '/',
  is_decimal: false,
  url: 'http://www.eia.gov/tools/faqs/faq.cfm?id=36&t=6'
)

Question.create(
  issue_id: 16,
  title: 'What percent of crude oil processed in US refineries is imported?',
  is_exponential: true,
  min: 0,
  max: 100,
  correct: 60,
  units: '/',
  is_decimal: false,
  url: 'http://www.eia.gov/tools/faqs/faq.cfm?id=36&t=6'
)

Question.create(
  issue_id: 16,
  title: 'What year is projected to be the peak year for oil production from new offshore drilling leases?',
  is_exponential: false,
  min: 2013,
  max: 2200,
  correct: 2030,
  units: '/',
  is_decimal: false,
  url: 'http://www.usclimatenetwork.org/resource-database/offshore-drilling-a-false-answer-to-energy-prices'
)

Question.create(
  issue_id: 16,
  title: 'How many gallons of oil are annually spilled due to offshore drilling?',
  is_exponential: true,
  min: 0,
  max: 10000000,
  correct: 42000,
  units: '/',
  is_decimal: false,
  url: 'http://www.care2.com/causes/offshore-drilling-is-energy-worth-the-ecological-disaster-of-oil-spills.html'
)

Question.create(
  issue_id: 16,
  title: 'Per decade, how many times do spills of more than 10,000 barrels occur?',
  is_exponential: true,
  min: 0,
  max: 100,
  correct: 3,
  units: '/',
  is_decimal: false,
  url: 'http://www.care2.com/causes/offshore-drilling-is-energy-worth-the-ecological-disaster-of-oil-spills.html'
)

Question.create(
  issue_id: 2,
  title: 'How many patent attorneys and agents are in the US?',
  is_exponential: true,
  min: 100,
  max: 1000000,
  correct: 40000,
  units: '/',
  is_decimal: false,
  url: 'http://arstechnica.com/tech-policy/2012/03/opinion-the-problem-with-software-patents-they-dont-scale/'
)

Question.create(
  issue_id: 2,
  title: 'How many new software patents are issued each year in the US?',
  is_exponential: true,
  min: 100,
  max: 1000000,
  correct: 40000,
  units: '/',
  is_decimal: false,
  url: 'http://arstechnica.com/tech-policy/2012/03/opinion-the-problem-with-software-patents-they-dont-scale/'
)

Question.create(
  issue_id: 2,
  title: 'How many full-time attorneys would it take to make sure that no company is infringing on a software patent?',
  is_exponential: true,
  min: 100,
  max: 100000000,
  correct: 2000000,
  units: '/',
  is_decimal: false,
  url: 'http://arstechnica.com/tech-policy/2012/03/opinion-the-problem-with-software-patents-they-dont-scale/'
)

Question.create(
  issue_id: 2,
  title: 'Per capita, how much money do patent trolls annually cost the US?',
  is_exponential: true,
  min: 0.1,
  max: 10000,
  correct: 93,
  units: '$/',
  is_decimal: true,
  url: 'http://venturebeat.com/2012/06/26/we-want-our-30b-back-patent-trolls-were-looking-at-you-nathan-myhrvold/'
)

Question.create(
  issue_id: 12,
  title: 'How many pounds of trans fat does an average American eat annually?',
  is_exponential: true,
  min: 1,
  max: 100,
  correct: 5,
  units: '/ lbs',
  is_decimal: false,
  url: 'http://www.msnbc.msn.com/id/16051436/ns/health-diet_and_nutrition/t/new-york-city-passes-trans-fat-ban/#.UHNf2a5f2So'
)

Question.create(
  issue_id: 12,
  title: 'What is the maximum recommend amount of trans fat to consume per day (grams)?',
  is_exponential: true,
  min: 0,
  max: 50,
  correct: 2,
  units: '/g',
  is_decimal: false,
  url: 'http://www.heart.org/HEARTORG/GettingHealthy/FatsAndOils/Fats101/Trans-Fats_UCM_301120_Article.jsp'
)

Question.create(
  issue_id: 12,
  title: 'How many annual deaths in the US are attributed to trans fat consumption?',
  is_exponential: true,
  min: 0,
  max: 1000000,
  correct: 20000,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/Trans_fat'
)

Question.create(
  issue_id: 3,
  title: 'Approximately how much does one TSA nude-body scanner cost?',
  is_exponential: true,
  min: 1000,
  max: 10000000,
  correct: 200000,
  units: '$/',
  is_decimal: false,
  url: 'http://articles.businessinsider.com/2012-05-10/politics/31650296_1_tsa-to-advanced-imaging-technology-scanners'
)

Question.create(
  issue_id: 3,
  title: 'How many people does the TSA directly employ?',
  is_exponential: true,
  min: 1000,
  max: 1000000,
  correct: 60000,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/Transportation_Security_Administration'
)

Question.create(
  issue_id: 3,
  title: 'How much does the TSA annually cost, per capita?',
  is_exponential: true,
  min: 0.1,
  max: 10000,
  correct: 26,
  units: '$/',
  is_decimal: true,
  url: 'http://en.wikipedia.org/wiki/Transportation_Security_Administration'
)

Question.create(
  issue_id: 3,
  title: 'According to a 2012 Gallup poll, what percent of Americans think the TSA is doing a good job?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 54,
  units: '/%',
  is_decimal: false,
  url: 'http://www.politico.com/news/stories/0812/79499.html?hp=r8'
)

Question.create(
  issue_id: 3,
  title: 'One CT scan emits how many times more radiation than a TSA scan?',
  is_exponential: true,
  min: 1,
  max: 10000000,
  correct: 200000,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/Backscatter_X-ray#Health_effects'
)

Question.create(
  issue_id: 3,
  title: 'It takes approximately how many seconds for an average TSA scan?',
  is_exponential: true,
  min: 1,
  max: 1000,
  correct: 30,
  units: '/s',
  is_decimal: false,
  url: 'http://www.studentnewsdaily.com/daily-news-article/scanners-and-probing-pat-downs-upset-airline-passengers/'
)

Question.create(
  issue_id: 3,
  title: 'Relative to theoretical levels, how much radiation were TSA scanners actually emitting when tested?',
  is_exponential: true,
  min: 50,
  max: 100000,
  correct: 1000,
  units: '/%',
  is_decimal: false,
  url: 'http://usatoday30.usatoday.com/news/washington/2011-03-11-tsa-scans_N.htm'
)

Question.create(
  issue_id: 9,
  title: 'Each year in the US, how many people die prematurely due to lack of healthcare?',
  is_exponential: true,
  min: 0,
  max: 10000000,
  correct: 45000,
  units: '/',
  is_decimal: false,
  url: 'http://news.harvard.edu/gazette/story/2009/09/new-study-finds-45000-deaths-annually-linked-to-lack-of-health-coverage/'
)

Question.create(
  issue_id: 9,
  title: 'How much do Medicaid and Medicare annually cost taxpayers per capita?',
  is_exponential: true,
  min: 0.1,
  max: 10000,
  correct: 3190,
  units: '$/',
  is_decimal: true,
  url: 'http://usatoday30.usatoday.com/news/health/healthcare/health/healthcare/story/2011/08/Medicare-Medicaid-tab-keeps-growing/49776998/1'
)

Question.create(
  issue_id: 9,
  title: 'In 1980, how much of the federal budget was spent on health care?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 11,
  units: '/%',
  is_decimal: false,
  url: 'http://www.washingtonpost.com/opinions/health-cares-heap-of-waste/2012/09/13/ee62aa62-fdb6-11e1-b153-218509a954e1_story.html'
)

Question.create(
  issue_id: 9,
  title: 'In 2011, how much of the federal budget was spent on health care?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 27,
  units: '/%',
  is_decimal: false,
  url: 'http://www.washingtonpost.com/opinions/health-cares-heap-of-waste/2012/09/13/ee62aa62-fdb6-11e1-b153-218509a954e1_story.html'
)

Question.create(
  issue_id: 9,
  title: 'What percent of Americans are covered by Medicare or Medicaid?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 30,
  units: '/%',
  is_decimal: false,
  url: 'http://aspe.hhs.gov/health/reports/2011/cpshealthins2011/ib.shtml'
)

Question.create(
  issue_id: 9,
  title: 'How much does the US spend on healthcare relative to GDP?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 16,
  units: '/%',
  is_decimal: false,
  url: 'http://www.commonwealthfund.org/~/media/Files/Publications/Issue%20Brief/2011/Jul/1532_Squires_US_hlt_sys_comparison_12_nations_intl_brief_v2.pdf'
)

Question.create(
  issue_id: 9,
  title: 'In terms of percent of GDP spent on healthcare, where does the US rank globally?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 30,
  units: '/',
  is_decimal: false,
  url: 'http://www.commonwealthfund.org/~/media/Files/Publications/Issue%20Brief/2011/Jul/1532_Squires_US_hlt_sys_comparison_12_nations_intl_brief_v2.pdf'
)

Question.create(
  issue_id: 9,
  title: 'What is the average wait time for a doctors visit in the current US system?',
  is_exponential: true,
  min: 1,
  max: 300,
  correct: 21,
  units: '/ min',
  is_decimal: false,
  url: 'http://www.huffingtonpost.com/2012/04/04/doctor-office-wait-times_n_1400957.html'
)

Question.create(
  issue_id: 9,
  title: 'For every dollar that states spend on uninsured healthcare, how much does the federal government contribute?',
  is_exponential: false,
  min: 0,
  max: 20,
  correct: 2,
  units: '$/',
  is_decimal: false,
  url: 'http://www.kff.org/insurance/upload/7670-03.pdf'
)

Question.create(
  issue_id: 9,
  title: 'Where does the US rank for globally for the lowest infant mortality rate?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 34,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/List_of_countries_by_infant_mortality_rate'
)

Question.create(
  issue_id: 9,
  title: 'Where does the US rank for globally for life expectancy?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 38,
  units: '/',
  is_decimal: false,
  url: 'http://en.wikipedia.org/wiki/List_of_countries_by_life_expectancy'
)

Question.create(
  issue_id: 9,
  title: 'Medical bills cause what percent of US bankruptcies?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 60,
  units: '/%',
  is_decimal: false,
  url: 'http://articles.cnn.com/2009-06-05/health/bankruptcy.medical.bills_1_medical-bills-bankruptcies-health-insurance?_s=PM:HEALTH'
)

Question.create(
  issue_id: 9,
  title: 'What percent of Americans think health care should be a right?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 64,
  units: '/%',
  is_decimal: false,
  url: 'http://www.political.com/Reports/Majority_Say_Health_Care_For_All'
)

Question.create(
  issue_id: 9,
  title: 'Per capita, how much money was spent on health care lobbying in 2010?',
  is_exponential: true,
  min: 0.1,
  max: 1000,
  correct: 1.6,
  units: '$/',
  is_decimal: false,
  url: 'http://money.cnn.com/2011/03/25/news/economy/health_care_lobbying/index.htm'
)

Question.create(
  issue_id: 9,
  title: 'How much of every dollar spent on US health care is considered \'waste\'?',
  is_exponential: false,
  min: 0,
  max: 99,
  correct: 30,
  units: '$0./',
  is_decimal: false,
  url: 'http://news.yahoo.com/report-us-health-care-system-wastes-750b-140106406.html'
)

Question.create(
  issue_id: 9,
  title: 'Relative to inflation, how much are health insurance premiums increasing?',
  is_exponential: true,
  min: 25,
  max: 1000,
  correct: 250,
  units: '/%',
  is_decimal: false,
  url: 'http://www.oecd.org/canada/BriefingNoteCANADA2012.pdf'
)

Question.create(
  issue_id: 9,
  title: 'In terms of spending the most on pharmaceutical drugs, where does the US rank?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 1,
  units: '/',
  is_decimal: false,
  url: 'http://www.oecd.org/health/healthpoliciesanddata/36960035.pdf'
)

Question.create(
  issue_id: 9,
  title: 'In terms of physicians per capita, where does the US rank?',
  is_exponential: false,
  min: 1,
  max: 100,
  correct: 52,
  units: '/',
  is_decimal: false,
  url: 'http://www.nationmaster.com/graph/hea_phy_per_1000_peo-physicians-per-1-000-people'
)

Question.create(
  issue_id: 9,
  title: 'What percent of US citizens were medically uninsured in 2010?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 16,
  units: '/%',
  is_decimal: false,
  url: 'http://aspe.hhs.gov/health/reports/2011/cpshealthins2011/ib.shtml'
)

Question.create(
  issue_id: 13,
  title: 'How many personnel are required to fully operate a military Predator drone?',
  is_exponential: true,
  min: 1,
  max: 200,
  correct: 82,
  units: '/',
  is_decimal: false,
  url: 'http://science.howstuffworks.com/predator6.htm'
)

Question.create(
  issue_id: 13,
  title: 'How many military drone pilots does the Pentagon want by 2015?',
  is_exponential: true,
  min: 10,
  max: 100000,
  correct: 2000,
  units: '/',
  is_decimal: false,
  url: 'http://www.nytimes.com/2012/07/30/us/drone-pilots-waiting-for-a-kill-shot-7000-miles-away.html?_r=5&hp&pagewanted=all&'
)

Question.create(
  issue_id: 13,
  title: 'What percent of drone casualities are considered high-level targets?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 2,
  units: '/%',
  is_decimal: false,
  url: 'http://www.cnn.com/2012/09/25/world/asia/pakistan-us-drone-strikes/index.html'
)

Question.create(
  issue_id: 13,
  title: 'How many drone strikes occured in Pakistan in 2012?',
  is_exponential: true,
  min: 0,
  max: 10000,
  correct: 48,
  units: '/',
  is_decimal: false,
  url: 'http://counterterrorism.newamerica.net/drones/2012#2012chart'
)

Question.create(
  issue_id: 13,
  title: 'What percent of the US support domestic drone use?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 44,
  units: '/%',
  is_decimal: false,
  url: 'http://www.cbsnews.com/8301-201_162-57521768/more-than-a-third-fear-drone-use-in-u.s.-poll/'
)

Question.create(
  issue_id: 13,
  title: 'Due to privacy concerns, what percent of Americans are \'very concerned\' about domestic drone use?',
  is_exponential: false,
  min: 0,
  max: 100,
  correct: 35,
  units: '/%',
  is_decimal: false,
  url: 'http://www.cbsnews.com/8301-201_162-57521768/more-than-a-third-fear-drone-use-in-u.s.-poll/'
)

Question.create(
  issue_id: 13,
  title: 'How many Pakistani civilians have been killed by US drones?',
  is_exponential: true,
  min: 0,
  max: 100000,
  correct: 700,
  units: '/',
  is_decimal: false,
  url: 'http://www.cnn.com/2012/09/25/world/asia/pakistan-us-drone-strikes/index.html'
)