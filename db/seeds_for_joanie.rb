# These are comments! They are a nice way to leave you notes
# because they get ignored by the compiler (the thing that makes
# all the code work)

# Here are the issue id's so you can properly categorize
# the questions you make:

# Marijuana legalization      => 1      Federal employee compensation => 10
# Software patent trolling    => 2      Hydraulic fracking            => 11
# TSA nude body scanners      => 3      Trans fat                     => 12
# Electoral College           => 4      Unmanned aerial vehicles      => 13
# Finland's education system  => 5      Federal minimum wage          => 14
# Climate Change              => 6      Oil company subsidies         => 15
# College and University      => 7      Offshore drilling             => 16
# Ethanol subsidies           => 8      Citizens United               => 17
# Universal health care       => 9      Abortion                      => 18

# some more notes hooray!
# any sort of text (title, url, and content) needs to be wrapped
# in " ", these are known as strings
# to use an apostrophe inside of a string you need to put a
# forward slash in front of it first like so \'
# the same applies to using quotes inside of strings

# the questions get assigned an id when they are created so the
# first question on your list will have an id of 110, this is 
# important keep track of because you need to enter it into the
# question_id field of each answer (it's how we keep everything
# linked properly)

# the correct answer should have it's is_correct field set to true,
# all of the wrong answers will be false (you probably would've figured
# that out your own anyway)

# since all of the questions you will be making are multiple choice, 
# all of the is_slider fields will be false

# good luck! you can just alter these first few I've made you and
# then continue adding to this file  <(''<) <('')> (>'')> <('')>

Question.create(
  issue_id: 1,
  title: "Does money grow on trees?",
  url: "http://www.source.com",
  is_slider: false
)

Answer.create(
  question_id: 110,
  content: "No way in hell",
  is_correct: true
)

Answer.create(
  question_id: 110,
  content: "Of course it does",
  is_correct: false
)

Answer.create(
  question_id: 110,
  content: "It actually comes from a vine",
  is_correct: false
)