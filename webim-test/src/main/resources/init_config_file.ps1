$cluster=$env:WEBIM_CLUSTER
$baseurl=$env:EXTERNAL_BASE_URL
$username=$env:USER_NAME
$password=$env:USER_PASSWORD
$redisuri=$env:REDIS_URI
echo "webim cluster: $cluster"

$file="D:\jenkins\workspace\$env:JOB_NAME\static\js\easemob.im.config.js"
$properties_file="D:\jenkins\workspace\$env:JOB_NAME\webim.properties"

if (Test-Path $properties_file) {
  echo "Remove old properties file: $properties_file"
  Remove-Item -Path $properties_file -Recurse
}

if ($cluster -ceq "ebs") {
  $xmpp="im-api.easemob.com"
  $urlapi="a1.easemob.com"
  $appkey="easemob-demo#chatdemoui"
} elseif ($cluster -ceq "vip1") {
  $xmpp="im-api.vip1.easemob.com"
  $urlapi="a1.vip1.easemob.com"
  $appkey="easemob-demo#chatdemoui"
} elseif ($cluster -ceq "vip5") {
  $xmpp="im-api-vip5.easemob.com"
  $urlapi="a1-vip5.easemob.com"
  $appkey="easemob-demo#chatdemoui"
} elseif ($cluster -ceq "vip6") {
  $xmpp="im-api-vip6.easemob.com"
  $urlapi="a1.easemob-vip6.easemob.com"
  $appkey="vip6nuannan#chatdemoui"
} else {
  echo "No operations need to do, exit it..."
  echo "set env variable: WEBIM_CLUSTER: $cluster, BASE_URL: $baseurl, USER_NAME: $username, USER_PASSWORD: $password"
  "BASE_URL = $baseurl" | Out-File -encoding utf8 -Append $properties_file
  "WEBIM_CLUSTER = $cluster" | Out-File -encoding utf8 -Append $properties_file
  "REDIS_URI = $redisuri" | Out-File -encoding utf8 -Append $properties_file
  exit
}

if (!(Test-Path $file)) {
  echo "Can't find config file: $file"
  exit
}

echo "rewrite config file: $file"
$content=gc $file

echo "Remove config file: $file"
Remove-Item -Path $file -Recurse

foreach ($i in $content) {
  $i=$i -replace "xmppURL: '.*',", "xmppURL: '$xmpp',"
  $i=$i -replace "apiURL: protocol \+ '//.*',", "apiURL: protocol + '//$urlapi',"
  $i=$i -replace "appkey: "".*"",", "appkey: ""$appkey"","
  echo $i >>$file
}

echo "modify webim BASE_URL"
$baseurl="file://D:\jenkins\workspace\$env:JOB_NAME\index.html"
echo "new BASE_URL: $baseurl"

echo "set env variable: WEBIM_CLUSTER: $cluster, BASE_URL: $baseurl, USER_NAME: $username, USER_PASSWORD: $password"
"BASE_URL = $baseurl" | Out-File -encoding utf8 -Append $properties_file
"WEBIM_CLUSTER = $cluster" | Out-File -encoding utf8 -Append $properties_file
"REDIS_URI = $redisuri" | Out-File -encoding utf8 -Append $properties_file
echo "Successful to rewrite config file: $file, webim cluster: $cluster"