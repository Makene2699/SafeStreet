# Upgrade Plan: SafeStreet (20260922104610)

- **Generated**: 2026-09-22
- **HEAD Branch**: N/A
- **HEAD Commit ID**: N/A

## Available Tools

**JDKs**
- JDK 17: not available (baseline will be skipped)
- JDK 25.0.2: C:\Program Files\Java\jdk-25.0.2\bin (target runtime)

**Build Tools**
- Maven: **<TO_BE_INSTALLED>** (no Maven installation detected; required for all build and test verification)

Version control is unavailable because the workspace is not a Git repository; changes will remain uncommitted in the working directory.

## Guidelines

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred.

- Upgrade the Java runtime target only, preserving application behavior and existing Spring Boot dependencies unless required for Java 25 compatibility.
- Run in auto-execution mode as requested.

## Options

- Working branch: appmod/java-upgrade-20260922104610
- Run tests before and after the upgrade: true

## Upgrade Goals

- Java 25

## Technology Stack

| Technology/Dependency | Current | Min Compatible Version | Why Incompatible |
| --------------------- | ------- | ---------------------- | ---------------- |
| Java | 17 | 25 | User requested Java 25 runtime target |
| Spring Boot | 3.2.5 | 3.2.5 | No direct upgrade required for the isolated Java target; verify on Java 25 |
| Maven | Not installed | 3.9+ | Required to build and test the project; Maven 3.9+ is recommended for Java 25 |
| spring-boot-maven-plugin | Managed by Spring Boot 3.2.5 | Managed | Existing plugin is retained unless Java 25 verification exposes incompatibility |
| JJWT | 0.12.3 | 0.12.3 | Existing API is Java-runtime independent; retain unless verification identifies an issue |

## Derived Upgrades

- Install Maven 3.9.x or the latest supported Maven because no Maven executable is available and Maven 3.9+ is recommended for Java 25.
- Set the Maven `java.version` property to `25`; Spring Boot's parent then configures compiler and toolchain-related defaults for that target.
- No Kotlin upgrade is required because the project contains no Kotlin configuration or source files.
- No source, configuration, CI/CD, or Jakarta namespace changes are expected from this isolated runtime-target upgrade; compilation and tests are the discriminating checks.

## Impact Analysis

### Dependency Changes

| File | Dependency | Current | Action | Target | Reason |
|------|------------|---------|--------|--------|--------|
| pom.xml | `java.version` property | 17 | upgrade | 25 | Sets the Java release used by Maven compilation and packaging |
| Build environment | Maven | Not installed | add/install | Maven 3.9.x or latest | Required to execute compilation and test verification |

### Source Code Changes

No source changes identified. Existing application code uses standard Spring/Jakarta APIs and will be validated against Java 25 after the build target changes.

### Configuration Changes

No application configuration changes identified. `application.properties` contains runtime application settings, not a Java-version-specific setting.

### CI/CD Changes

No CI/CD files were identified in the project scope. No CI update is required in this workspace.

### Risks & Warnings

- **Java 25 compatibility of Spring Boot 3.2.5**: This is an older Spring Boot line and may expose build-plugin or dependency compatibility issues on Java 25. **Mitigation**: Run full test compilation and tests on JDK 25; upgrade only the specific compatibility dependency if verification requires it.
- **No baseline JDK**: JDK 17 is not installed, so a pre-upgrade baseline test run cannot be performed. **Mitigation**: Use the existing target tree only as context and require clean Java 25 compilation plus a 100% passing post-upgrade test run.
- **Database-backed tests**: Tests may require the configured MySQL instance. **Mitigation**: Run the complete Maven test suite and fix test failures caused by the upgrade; report any environment-only blocker with its concrete error.
- **No version control**: The directory is not a Git repository. **Mitigation**: Preserve all changes in the working tree and record verification results in progress and summary artifacts.

## Upgrade Steps

- Step 1: Setup Environment
  - **Rationale**: Make the target JDK and Maven build tool available before changing project files.
  - **Changes to Make**: Install Maven 3.9.x or latest supported Maven; use `C:\Program Files\Java\jdk-25.0.2\bin`.
  - **Verification**: Confirm Maven and JDK 25 are available; expected result is both tools resolve successfully.

- Step 2: Setup Baseline
  - **Rationale**: Establish pre-upgrade test evidence when the current JDK is available.
  - **Changes to Make**: None.
  - **Verification**: Skipped because JDK 17 is not available.

- Step 3: Upgrade Java Runtime Target
  - **Rationale**: Apply the user-requested Java 25 runtime target in the Maven build.
  - **Changes to Make**: Apply the `java.version` change listed in Dependency Changes; make no unrelated source changes.
  - **Verification**: Run `mvn clean test-compile -q` on JDK 25; expected result is successful main and test compilation.

- Step 4: Final Validation
  - **Rationale**: Confirm the project builds and all tests pass on the requested runtime.
  - **Changes to Make**: Resolve any Java 25 compilation or test failures discovered during validation; remove temporary workarounds.
  - **Verification**: Run `mvn clean test -q` on JDK 25; expected result is 100% tests passing.

- Step 5: CVE Validation & Fix
  - **Rationale**: Check resolved direct dependencies after the runtime upgrade and remediate any reported vulnerabilities.
  - **Changes to Make**: Upgrade only vulnerable direct dependency versions or managed BOM versions when a patched version is available.
  - **Verification**: Scan direct dependencies, compile after fixes, and rescan; expected result is no remediable CVEs remaining.

- Step 6: Final Validation and Summary
  - **Rationale**: Produce final verification evidence and ensure all upgrade criteria are met.
  - **Changes to Make**: Generate progress and summary artifacts; run final clean verification including coverage where supported.
  - **Verification**: `mvn clean verify -Djacoco.skip=false` on JDK 25; expected result is successful build and tests, or a documented environment-only limitation.
