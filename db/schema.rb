# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130116173025) do

  create_table "challenges", :force => true do |t|
    t.integer  "issue_id"
    t.string   "question_ids"
    t.integer  "challenger_id"
    t.integer  "user_id"
    t.integer  "challenger_score"
    t.integer  "user_score"
    t.integer  "winner_id"
    t.boolean  "is_finished"
    t.boolean  "is_sent"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "issues", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "thumbnail"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "questions", :force => true do |t|
    t.integer  "issue_id"
    t.string   "title"
    t.boolean  "is_exponential"
    t.integer  "min"
    t.integer  "max"
    t.integer  "correct"
    t.string   "units"
    t.text     "url"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "tasks", :force => true do |t|
    t.integer  "challenge_id"
    t.integer  "user_id"
    t.integer  "issue_id"
    t.integer  "question_id"
    t.float    "time"
    t.integer  "answer"
    t.integer  "score"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
    t.boolean  "is_temp_user", :default => true
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

end
