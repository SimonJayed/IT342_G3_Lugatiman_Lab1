$headers = @{ "Content-Type" = "application/json" }
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "StrongP@ss123"
    name = "Test User"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/register" -Method Post -Headers $headers -Body $body
    Write-Output "Registration Successful: $($regResponse | ConvertTo-Json -Depth 5)"
} catch {
    Write-Output "Registration Failed: $_"
}

$loginBody = @{
    usernameOrEmail = "testuser"
    password = "StrongP@ss123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Headers $headers -Body $loginBody
    Write-Output "Login Successful: $($loginResponse | ConvertTo-Json)"
} catch {
    Write-Output "Login Failed: $_"
}
